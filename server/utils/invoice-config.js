export const INVOICE_SELLER = {
  name: 'Индивидуальный предприниматель Ручко Анастасия Викторовна',
  shortName: 'ИП Ручко А.В.',
  inn: '930900107014',
  ogrnip: '323930100105541 от 25.01.2023',
  bankName: process.env.COMPANY_BANK_NAME || 'ПАО «Банк ПСБ» г. Ярославль',
  bik: process.env.COMPANY_BIK || '044525555',
  rs: process.env.COMPANY_ACCOUNT || '40802810309300182031',
  ks: process.env.COMPANY_CORR_ACCOUNT || '30101810400000000555',
  legalAddress: 'РФ, ДНР, Г.О. Донецк, 283054, г. Донецк, ул. Аристова, д.1',
  actualAddress: 'РФ, ДНР, Г.О. Донецк, г. Донецк, ул. Постышева, д.60',
  phone: '+7949 131 45 44',
  email: 'info@indigo-mail.ru',
  basis: 'ОГРНИП 323930100105541 от 25.01.2023',
  title: 'Индивидуальный предприниматель',
  signerName: 'Ручко А.В.'
}

export const INVOICE_VAT = 'Без НДС, УСН'
export const INVOICE_DESIGN_LINE_NAME = 'Разработка дизайн-макета'
