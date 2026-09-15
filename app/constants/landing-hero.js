import albumsImage from '~/assets/images/landing/landing-hero-albums.jpg'
import flagsImage from '~/assets/images/landing/landing-hero-flags.jpg'
import photozonesImage from '~/assets/images/landing/landing-hero-photozones.jpg'
import puzzlesImage from '~/assets/images/landing/landing-hero-puzzles.jpg'
import sketchbooksImage from '~/assets/images/landing/landing-hero-sketchbooks.jpg'
import stickersImage from '~/assets/images/landing/landing-hero-stickers.jpg'
import tshirtsImage from '~/assets/images/landing/landing-hero-tshirts.jpg'

const directionLink = slug => `/catalog?direction=${slug}`
const audienceLink = slug => `/catalog?audience=${slug}`

export const landingHeroDropdowns = {
  direction: {
    label: 'Выберите направление',
    tags: [
      { label: 'Художникам', to: directionLink('artists') },
      { label: 'Свадебное', to: directionLink('wedding') },
      { label: 'Фотоальбомы', to: directionLink('photo-albums') },
      { label: 'Текстиль', to: directionLink('textile') },
      { label: 'Оформление магазинов', to: directionLink('store-design') },
      { label: 'Подарки', to: directionLink('gifts') },
      { label: 'Корпоративное', to: directionLink('corporate') },
      { label: 'К мероприятию', to: directionLink('events') }
    ]
  },
  audience: {
    label: 'Выберите, для кого',
    tags: [
      { label: 'Искусство и культура', to: audienceLink('art-culture') },
      { label: 'Гражданская и общественная деятельность', to: audienceLink('civic') },
      { label: 'Потребительские бренды', to: audienceLink('consumer-brands') },
      { label: 'Образование', to: audienceLink('education') },
      { label: 'Развлечение', to: audienceLink('entertainment') },
      { label: 'Мода и красота', to: audienceLink('fashion-beauty') },
      { label: 'Дети и семья', to: audienceLink('kids-family') },
      { label: 'Еда и напитки', to: audienceLink('food-drinks') },
      { label: 'Финансы', to: audienceLink('finance') },
      { label: 'Здоровье', to: audienceLink('health') },
      { label: 'Спорт и фитнес', to: audienceLink('sport-fitness') },
      { label: 'Некоммерческие организации', to: audienceLink('non-profit') },
      { label: 'Мероприятия', to: audienceLink('events') },
      { label: 'Транспорт', to: audienceLink('transport') },
      { label: 'Туризм и отели', to: audienceLink('tourism-hotels') },
      { label: 'Недвижимость', to: audienceLink('real-estate') },
      { label: 'Производство и промышленность', to: audienceLink('manufacturing') }
    ]
  }
}

const slideCaption = {
  title: 'Название проекта/изделия',
  description: 'Описание проекта/изделия: для кого и для чего сделан, в рамках какого мероприятия <...>'
}

export const landingHeroSlides = [
  {
    id: 'tshirts',
    image: tshirtsImage,
    imagePosition: '50% 0',
    direction: 'печатаем на футболках',
    audience: 'всех',
    ...slideCaption
  },
  {
    id: 'flags',
    image: flagsImage,
    direction: 'изготавливаем флаги',
    audience: 'фестивалей',
    ...slideCaption
  },
  {
    id: 'puzzles',
    image: puzzlesImage,
    direction: 'печатаем фотопазлы',
    audience: 'подарков близким',
    ...slideCaption
  },
  {
    id: 'sketchbooks',
    image: sketchbooksImage,
    direction: 'создаём скетчбуки',
    audience: 'творчества',
    ...slideCaption
  },
  {
    id: 'albums',
    image: albumsImage,
    direction: 'печатаем альбомы',
    audience: 'мероприятий',
    ...slideCaption
  },
  {
    id: 'photozones',
    image: photozonesImage,
    direction: 'создаём фотозоны',
    audience: 'рекламных кампаний',
    ...slideCaption
  },
  {
    id: 'stickers',
    image: stickersImage,
    direction: 'печатаем стикерпаки',
    audience: 'корпоративного мерча',
    ...slideCaption
  }
]
