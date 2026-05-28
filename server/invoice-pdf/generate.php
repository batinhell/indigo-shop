<?php

declare(strict_types=1);

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Writer\PngWriter;
use Mpdf\Config\ConfigVariables;
use Mpdf\Config\FontVariables;
use Mpdf\Mpdf;
use Mpdf\Output\Destination;

$autoloadCandidates = [
    dirname(__DIR__, 2) . '/vendor/autoload.php',
    __DIR__ . '/vendor/autoload.php',
];

$autoloadPath = null;
foreach ($autoloadCandidates as $candidate) {
    if (is_file($candidate)) {
        $autoloadPath = $candidate;
        break;
    }
}

if ($autoloadPath === null) {
    fwrite(STDERR, "Composer autoload not found. Run composer install on the server.\n");
    exit(1);
}

require $autoloadPath;

$outputPath = $argv[1] ?? '';
if ($outputPath === '') {
    fwrite(STDERR, "Output PDF path is required.\n");
    exit(1);
}

$input = stream_get_contents(STDIN);
$data = json_decode($input, true);
if (!is_array($data)) {
    fwrite(STDERR, "Invalid invoice JSON payload.\n");
    exit(1);
}

$rootDir = dirname(__DIR__, 2);
$fontDir = $rootDir . '/server/assets/fonts';
$tempDir = $rootDir . '/storage/app/mpdf-tmp';
$logoPath = $rootDir . '/app/assets/images/logo.png';

if (!is_dir($tempDir) && !mkdir($tempDir, 0775, true) && !is_dir($tempDir)) {
    fwrite(STDERR, "Unable to create mPDF temp directory: {$tempDir}\n");
    exit(1);
}

$data['total_words'] = amountInWords((float)($data['total'] ?? 0));
$data['qr_base64'] = generateSbpQr($data);
$data['logo_base64'] = imageDataUri($logoPath);

$html = renderTemplate(__DIR__ . '/invoice-template.php', $data);

$defaultConfig = (new ConfigVariables())->getDefaults();
$defaultFontConfig = (new FontVariables())->getDefaults();

$mpdf = new Mpdf([
    'mode' => 'utf-8',
    'format' => 'A4',
    'tempDir' => $tempDir,
    'fontDir' => array_merge($defaultConfig['fontDir'], [$fontDir]),
    'fontdata' => $defaultFontConfig['fontdata'] + [
        'manrope' => [
            'R' => 'Invoice-Regular.ttf',
            'B' => 'Invoice-Bold.ttf',
            'useOTL' => 0xFF,
            'useKashida' => 75,
        ],
    ],
    'default_font' => 'manrope',
    'margin_left' => 12,
    'margin_right' => 12,
    'margin_top' => 12,
    'margin_bottom' => 12,
]);

$mpdf->SetTitle('Счёт на оплату');
$mpdf->SetAuthor('Индиго');
$mpdf->SetCreator('Индиго / ra-indigo.com');
$mpdf->WriteHTML($html);

$outputDir = dirname($outputPath);
if (!is_dir($outputDir) && !mkdir($outputDir, 0775, true) && !is_dir($outputDir)) {
    fwrite(STDERR, "Unable to create PDF output directory: {$outputDir}\n");
    exit(1);
}

$mpdf->Output($outputPath, Destination::FILE);

function renderTemplate(string $path, array $data): string
{
    extract($data, EXTR_SKIP);
    ob_start();
    include $path;
    return (string)ob_get_clean();
}

function amountInWords(float $amount): string
{
    if (!class_exists(NumberFormatter::class)) {
        throw new RuntimeException('PHP intl extension is required for invoice amount in words.');
    }

    $rubles = (int)floor($amount);
    $kopecks = (int)round(($amount - $rubles) * 100);

    $formatter = new NumberFormatter('ru', NumberFormatter::SPELLOUT);
    $words = (string)$formatter->format($rubles);
    $words = mb_strtoupper(mb_substr($words, 0, 1)) . mb_substr($words, 1);

    return sprintf('%s рублей %02d копеек', $words, $kopecks);
}

function generateSbpQr(array $data): string
{
    if (!class_exists(Builder::class) || !class_exists(PngWriter::class)) {
        return '';
    }

    $company = $data['company'] ?? [];
    $payload = sprintf(
        'ST00012|Name=%s|PersonalAcc=%s|BankName=%s|BIC=%s|CorrespAcc=%s|PayeeINN=%s|Sum=%d|Purpose=Оплата счёта №%s',
        (string)($company['name'] ?? ''),
        (string)($company['account'] ?? ''),
        (string)($company['bank_name'] ?? ''),
        (string)($company['bik'] ?? ''),
        (string)($company['corr_account'] ?? ''),
        (string)($company['inn'] ?? ''),
        (int)round(((float)($data['total'] ?? 0)) * 100),
        (string)($data['invoice_number'] ?? '')
    );

    $result = Builder::create()
        ->writer(new PngWriter())
        ->data($payload)
        ->size(300)
        ->margin(10)
        ->build();

    return 'data:image/png;base64,' . base64_encode($result->getString());
}

function imageDataUri(string $path): string
{
    if (!is_file($path)) {
        return '';
    }

    $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
    $mimeTypes = [
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'webp' => 'image/webp',
        'svg' => 'image/svg+xml',
    ];
    $mimeType = $mimeTypes[$extension] ?? 'application/octet-stream';

    return 'data:' . $mimeType . ';base64,' . base64_encode((string)file_get_contents($path));
}
