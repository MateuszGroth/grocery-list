import { green, amber, teal, blue, deepPurple, deepOrange, pink, blueGrey } from '@mui/material/colors'

import { Category, CategoryKey, Product, Unit } from 'types'

const SHADE = 500
const LIGHT_SHADE = 300

export const CATEGORIES: Record<CategoryKey, Category> = {
  vegetable: {
    label: 'Warzywo',
    color: green[SHADE],
    darkModeColor: green[LIGHT_SHADE],
    key: 'vegetable',
  },
  fruit: {
    label: 'Owoc',
    color: amber[SHADE],
    darkModeColor: amber[LIGHT_SHADE],
    key: 'fruit',
  },
  nabial: {
    label: 'Nabiał',
    color: teal[SHADE],
    darkModeColor: teal[LIGHT_SHADE],
    key: 'nabial',
  },
  meat: {
    label: 'Mięso',
    color: teal[LIGHT_SHADE],
    darkModeColor: teal[LIGHT_SHADE],
    key: 'meat',
  },
  frozen: {
    label: 'Mrozonki',
    color: blue[SHADE],
    darkModeColor: blue[LIGHT_SHADE],
    key: 'frozen',
  },
  bathroom: {
    label: 'Do Łazienki',
    color: deepPurple[SHADE],
    darkModeColor: deepPurple[LIGHT_SHADE],
    key: 'bathroom',
  },
  spices: {
    label: 'Przyprawy',
    color: deepOrange[SHADE],
    darkModeColor: deepOrange[LIGHT_SHADE],
    key: 'spices',
  },
  sweets: {
    label: 'Słodycze',
    color: pink[SHADE],
    darkModeColor: pink[LIGHT_SHADE],
    key: 'sweets',
  },
  random: {
    label: 'Rózne',
    color: blueGrey[SHADE],
    darkModeColor: blueGrey[LIGHT_SHADE],
    key: 'random',
  },
}

const FRUITS = ['Cytryna', 'Grejfrut', 'Jabłko', 'Kiwi', 'Banan', 'Gruszka', 'Pomarańcza', 'Arbuz', 'Mango', 'Avocado']
const VEGETABLES = [
  'Brokuł',
  'Papryka',
  'Pomidor',
  'Ogórek',
  'Cukinia',
  'Marchew',
  'Ziemniak',
  'Batat',
  'Kapusta',
  'Włoszczyzna',
  'Pietruszka',
  'Seler',
  'Cebula',
  'Sałata',
]
const NABIAL = ['Mleko Owsiane', 'Mleko', 'Jajka', 'Ser', 'Ser Sałatkowy', 'Bakuś', 'Jogurt Naturalny', 'Śmietana']
const MEAT = ['Kurczak Pierś', 'Skrzydełka', 'Na Rosół', 'Mielone', 'Indyk', 'Wędlina']
const FROZEN = ['Warzywa mrozone', 'Lody']
const BATHROOM = [
  'Papier',
  'Źel pod prysznic',
  'Chusteczki',
  'Papier wilgotny',
  'Podpaski',
  'Pasta do Zębów',
  'Krem',
  'Szampon',
]
const SPICES = ['Słodka papryka', 'Chili', 'Do Kurczaka', 'Majeranek', 'Oregano', 'Cynamon']
const SWEETS = [
  'Źelki',
  'Kinder Delice',
  'Czipsy',
  'Kinder Country',
  'Rafaello',
  'Pistacje',
  'Chrupki',
  'Orzechy',
  'Lizak',
  'Schoco Bonsy',
  'Kinder Bueno',
]
const RANDOM = [
  'Oliwa',
  'Olej',
  'Ogórki Kiszone',
  'Ogórki Konserwowe',
  'Keczup',
  'Majonez',
  'Musztarda',
  'Na Zawijańce',
  'Na Sałatkę',
  'Na Kebaba',
  'Mleko kokosowe',
  'Sos do Spaghetti',
  'Mąka',
  'Makaron',
  'Płatki do mleka',
  'Dzem',
  'Zwir dla kota',
  'Karma dla kota',
]

export const PRODUCTS: Product[] = [
  ...FRUITS.map((label) => ({ category: 'fruit', label })),
  ...VEGETABLES.map((label) => ({ category: 'vegetable', label })),
  ...NABIAL.map((label) => ({ category: 'nabial', label })),
  ...MEAT.map((label) => ({ category: 'meat', label })),
  ...FROZEN.map((label) => ({ category: 'frozen', label })),
  ...BATHROOM.map((label) => ({ category: 'bathroom', label })),
  ...SPICES.map((label) => ({ category: 'spices', label })),
  ...SWEETS.map((label) => ({ category: 'sweets', label })),
  ...RANDOM.map((label) => ({ category: 'random', label })),
].sort((a, b) => a.label.localeCompare(b.label))

export const UNIT: Record<string, Unit> = {
  KG: 'kg',
  SZT: 'szt',
  L: 'L',
}
