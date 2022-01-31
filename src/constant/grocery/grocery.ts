import { red, green, teal, blue, deepPurple, deepOrange, pink, blueGrey, brown } from '@mui/material/colors'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import BathtubIcon from '@mui/icons-material/Bathtub'
import CookieIcon from '@mui/icons-material/Cookie'
import AppleIcon from '@mui/icons-material/Apple'
import { Meat, Vegetable, Pepper, Cheese } from 'components/icons'

import { Category, CategoryKey, Product, Unit } from 'types'

const SHADE = 500
const ICON_SHADE = 'A400'
const DARK_MODE_SHADE = '200'
const DARK_MODE_ICON_SHADE = '900'

const getColorCallbacks = (
  color: Record<any, any>,
): { getColor(themeMode: 'light' | 'dark'): string; getIconColor(themeMode: 'light' | 'dark'): string } => {
  return {
    getColor: (themeMode) => {
      if (themeMode === 'dark') {
        return color[DARK_MODE_SHADE]
      }
      return color[SHADE]
    },
    getIconColor: (themeMode) => {
      if (themeMode === 'dark') {
        return color[DARK_MODE_ICON_SHADE]
      }

      return color[ICON_SHADE]
    },
  }
}

export const CATEGORIES: Record<CategoryKey, Category> = {
  vegetable: {
    label: 'Warzywa',
    key: 'vegetable',
    Icon: Vegetable,
    ...getColorCallbacks(green),
  },
  fruit: {
    label: 'Owoce',
    key: 'fruit',
    Icon: AppleIcon,
    ...getColorCallbacks(red),
  },
  nabial: {
    label: 'Nabiał',
    key: 'nabial',
    Icon: Cheese,
    ...getColorCallbacks(teal),
  },
  meat: {
    label: 'Mięso',
    key: 'meat',
    Icon: Meat,
    ...getColorCallbacks(brown),
  },
  frozen: {
    label: 'Mrożonki',
    key: 'frozen',
    Icon: AcUnitIcon,
    ...getColorCallbacks(blue),
  },
  bathroom: {
    label: 'Łazienka',
    key: 'bathroom',
    Icon: BathtubIcon,
    ...getColorCallbacks(deepPurple),
  },
  spices: {
    label: 'Przyprawy',
    key: 'spices',
    Icon: Pepper,
    ...getColorCallbacks(deepOrange),
  },
  sweets: {
    label: 'Słodycze',
    key: 'sweets',
    Icon: CookieIcon,
    ...getColorCallbacks(pink),
  },
  random: {
    label: 'Rózne',
    key: 'random',
    Icon: AutoAwesomeIcon,
    ...getColorCallbacks(blueGrey),
  },
}

const FRUITS = [
  'Cytryna',
  'Grejfrut',
  'Jabłko',
  'Kiwi',
  'Banan',
  'Gruszka',
  'Pomarańcza',
  'Arbuz',
  'Mango',
  'Avocado',
  'Mandarynka',
]
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
  'Por',
  'Buraki',
  'Kapusta Czerwona',
]
const NABIAL = [
  'Mleko Owsiane',
  'Mleko',
  'Jajka',
  'Ser',
  'Ser Sałatkowy',
  'Bakuś',
  'Jogurt Naturalny',
  'Śmietana',
  'Masło',
  'Ser Feta',
  'Ser Grillowany',
  'Drożdże',
]
const MEAT = ['Kurczak Pierś', 'Skrzydełka', 'Kurczak na Rosół', 'Mielone', 'Indyk', 'Wędlina', 'Kurczak Trymowany']
const FROZEN = ['Warzywa mrozone', 'Lody', 'Pizza', 'Marchewka z Groszkiem']
const BATHROOM = [
  'Papier',
  'Źel pod prysznic',
  'Chusteczki',
  'Papier wilgotny',
  'Pasta do Zębów',
  'Krem nawilżający',
  'Szampon',
  'Proszek do Prania',
  'Tabletki do Zmywarki',
  'Szczoteczka do Zębów',
]
const SPICES = ['Słodka papryka', 'Chili', 'Do Kurczaka', 'Majeranek', 'Oregano', 'Cynamon', 'Kostka rosołowa']
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
  'Sos do kurczka',
  'Mąka',
  'Makaron',
  'Płatki do mleka',
  'Dzem',
  'Zwir dla kota',
  'Karma dla kota',
]

export const PRODUCTS: Product[] = [
  ...[...new Set(FRUITS)].map((label) => ({ category: 'fruit', label })),
  ...[...new Set(VEGETABLES)].map((label) => ({ category: 'vegetable', label })),
  ...[...new Set(NABIAL)].map((label) => ({ category: 'nabial', label })),
  ...[...new Set(MEAT)].map((label) => ({ category: 'meat', label })),
  ...[...new Set(FROZEN)].map((label) => ({ category: 'frozen', label })),
  ...[...new Set(BATHROOM)].map((label) => ({ category: 'bathroom', label })),
  ...[...new Set(SPICES)].map((label) => ({ category: 'spices', label })),
  ...[...new Set(SWEETS)].map((label) => ({ category: 'sweets', label })),
  ...[...new Set(RANDOM)].map((label) => ({ category: 'random', label })),
].sort((a, b) => a.label.localeCompare(b.label))

export const UNIT: Record<string, Unit> = {
  KG: 'kg',
  SZT: 'szt.',
  L: 'L',
}

export const PRODUCT_ACTION = {
  DELETE: 'delete',
  DELETE_SELECTED: 'deleteSelected',
  DELETE_ALL: 'deleteAll',
  COMMENT: 'comment',
  EDIT: 'edit',
}
