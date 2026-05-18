import textileCapsImage from '~/assets/images/catalog/textile-caps.png'
import textileEmbroideryClothesImage from '~/assets/images/catalog/textile-embroidery-clothes.png'
import textileEmbroideryPatchesImage from '~/assets/images/catalog/textile-embroidery-patches.png'
import textileFlagsImage from '~/assets/images/catalog/textile-flags.png'
import textileMedalRibbonsImage from '~/assets/images/catalog/textile-medal-ribbons.png'
import textilePennantsImage from '~/assets/images/catalog/textile-pennants.png'
import textilePrintPillowImage from '~/assets/images/catalog/textile-print-pillow.png'
import textilePrintTshirtImage from '~/assets/images/catalog/textile-print-tshirt.png'
import textileRibbonPrintImage from '~/assets/images/catalog/textile-ribbon-print.png'
import textileShopperImage from '~/assets/images/catalog/textile-shopper.png'

export const catalogCategoryItems = [
  {
    id: 'textile',
    label: 'Текстиль',
    description: 'Нанесение на футболки, шопперы, кепки, флаги, нашивки'
  }
]

export const catalogProducts = [
  {
    id: 'catalog-textile-1',
    category: 'textile',
    images: [textilePrintTshirtImage],
    title: 'Печать на футболках',
    subtitle: 'DTF-печать с чёткими, насыщенными цветами и высокой детализацией',
    price: 'от 150 ₽',
    discount: '−10% от 20 шт',
    deliveryText: 'от 2 дней',
    deliveryTiming: 'short'
  },
  {
    id: 'catalog-textile-2',
    category: 'textile',
    images: [textilePrintPillowImage],
    title: 'Печать на подушках',
    subtitle: 'Сублимационная печать на хлопке, наполнение — синтепух',
    price: 'от 600 ₽',
    discount: '−10% от 20 шт',
    deliveryText: 'от 2 дней',
    deliveryTiming: 'short'
  },
  {
    id: 'catalog-textile-3',
    category: 'textile',
    images: [textileShopperImage],
    title: 'Шопперы',
    subtitle: 'Хлопковый шопер плотностью 180 г. область нанесения — 25×25 см',
    price: 'от 900 ₽',
    discount: '−10% от 20 шт',
    deliveryText: 'от 2 дней',
    deliveryTiming: 'short'
  },
  {
    id: 'catalog-textile-4',
    category: 'textile',
    images: [textileFlagsImage],
    title: 'Изготовление флагов',
    subtitle: 'Пять материалов и два размера на выбор',
    price: 'от 590 ₽',
    discount: '−16% от 100 шт',
    deliveryText: 'от 5 дней',
    deliveryTiming: 'medium',
    orderType: 'online'
  },
  {
    id: 'catalog-textile-5',
    category: 'textile',
    images: [textilePennantsImage],
    title: 'Вымпелы',
    subtitle: 'Полноцветная печать на атласе или матовом оксфорде',
    price: 'от 200 ₽',
    discount: '−40% от 100 шт',
    deliveryText: 'от 5 дней',
    deliveryTiming: 'medium',
    orderType: 'online'
  },
  {
    id: 'catalog-textile-6',
    category: 'textile',
    images: [textileCapsImage],
    title: 'Печать на кепках',
    subtitle: 'Хлопковые кепки плотностью 240 г, область нанесения — 10×10 см',
    price: 'от 750 ₽',
    discount: '−17% от 100 шт',
    deliveryText: 'от 5 дней',
    deliveryTiming: 'medium'
  },
  {
    id: 'catalog-textile-7',
    category: 'textile',
    images: [textileEmbroideryClothesImage],
    title: 'Вышивка на одежде',
    subtitle: 'Объёмная машинная вышивка премиального качества',
    price: 'от 250 ₽',
    discount: '−75% от 300 шт',
    deliveryText: 'от 5 дней',
    deliveryTiming: 'medium'
  },
  {
    id: 'catalog-textile-8',
    category: 'textile',
    images: [textileEmbroideryPatchesImage],
    title: 'Вышивка шевронов',
    subtitle: 'Детальная вышивка на плотной основе',
    price: 'от 200 ₽',
    discount: '−75% от 300 шт',
    deliveryText: 'от 5 дней',
    deliveryTiming: 'medium',
    orderType: 'online'
  },
  {
    id: 'catalog-textile-9',
    category: 'textile',
    images: [textileRibbonPrintImage],
    title: 'Печать ленты',
    subtitle: 'Печать на атласной ленте золотой, серебряной или чёрной краской',
    price: 'от 35 ₽/м',
    discount: '−93% от 100 м',
    deliveryText: 'от 5 дней',
    deliveryTiming: 'medium'
  },
  {
    id: 'catalog-textile-10',
    category: 'textile',
    images: [textileMedalRibbonsImage],
    title: 'Ленты для медалей',
    subtitle: 'Репсовая лента 2,5×5 см с полноцветной печатью',
    price: 'от 50 ₽',
    discount: '-15%',
    deliveryText: 'от 5 дней',
    deliveryTiming: 'medium'
  }
]
