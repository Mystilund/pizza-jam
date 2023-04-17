import {
  ArrayElement,
  Configuration,
  ImgAssetUrl,
  Ingredients,
  Language,
  Recipe,
} from './types';

export const CDN_URL = 'https://d27vevw9zkuexv.cloudfront.net';

export const imgAssets = [
  'logo.png',
  'menu-bg.jpg',
  'pizza-recipe-bg.jpg',
  'wood-loop-bg.jpg',
  'preparation-main-view-bg.jpg',
  'beef.png',
  'blue-cheese.png',
  'chicken.png',
  'cream.png',
  'dough.png',
  'goat-cheese.png',
  'ham.png',
  'honey.png',
  'mozzarella.png',
  'mushroom.png',
  'olives.png',
  'onions.png',
  'origan.png',
  'pepperoni.png',
  'peppers.png',
  'pineapple.png',
  'potato.png',
  'salmon.png',
  'tomato-sauce.png',
  'tuna.png',
] as const;

export const audioAssets = [
  'funiculi-funicula.mp3',
  'tarantela-napolitana.mp3',
  'shop-door-bell-sound.mp3',
  'test-beep.mp3',
] as const;

export const validKeyboardKey = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
] as const;

export type ValidKeyboardKey = ArrayElement<typeof validKeyboardKey>;

export const IngredientsPerRecipe: Record<Recipe, Ingredients[]> = {
  [Recipe.MARGHERITA]: [
    Ingredients.DOUGH,
    Ingredients.TOMATO_SAUCE,
    Ingredients.CHEESE,
    Ingredients.HERBS,
  ],
  [Recipe.GOAT_HONEY]: [
    Ingredients.DOUGH,
    Ingredients.CREAM_SAUCE,
    Ingredients.GOAT_CHEESE,
    Ingredients.HONEY,
  ],
  [Recipe.CARNE]: [
    Ingredients.DOUGH,
    Ingredients.TOMATO_SAUCE,
    Ingredients.HAM,
    Ingredients.PEPPERONI,
  ],
  [Recipe.REGINA]: [
    Ingredients.DOUGH,
    Ingredients.TOMATO_SAUCE,
    Ingredients.CHEESE,
    Ingredients.HAM,
    Ingredients.MUSHROOMS,
  ],
  [Recipe.PEPPERONI]: [
    Ingredients.DOUGH,
    Ingredients.TOMATO_SAUCE,
    Ingredients.CHEESE,
    Ingredients.PEPPERONI,
    Ingredients.HERBS,
  ],
  [Recipe.THREE_CHEESE]: [
    Ingredients.DOUGH,
    Ingredients.TOMATO_SAUCE,
    Ingredients.CHEESE,
    Ingredients.GOAT_CHEESE,
    Ingredients.BLUE_CHEESE,
  ],
  [Recipe.NORWEGIAN]: [
    Ingredients.DOUGH,
    Ingredients.CREAM_SAUCE,
    Ingredients.CHEESE,
    Ingredients.SALMON,
    Ingredients.ONIONS,
  ],
  [Recipe.BOLLYWOOD]: [
    Ingredients.DOUGH,
    Ingredients.TOMATO_SAUCE,
    Ingredients.CHICKEN,
    Ingredients.PEPPERS,
    Ingredients.ONIONS,
  ],
  [Recipe.VEGGIE]: [
    Ingredients.DOUGH,
    Ingredients.TOMATO_SAUCE,
    Ingredients.CHEESE,
    Ingredients.MUSHROOMS,
    Ingredients.PEPPERS,
    Ingredients.OLIVES,
  ],
  [Recipe.HAWAI]: [
    Ingredients.DOUGH,
    Ingredients.CREAM_SAUCE,
    Ingredients.CHEESE,
    Ingredients.HAM,
    Ingredients.HERBS,
    Ingredients.PINEAPPLE,
  ],
  [Recipe.THREE_MEAT]: [
    Ingredients.DOUGH,
    Ingredients.TOMATO_SAUCE,
    Ingredients.CHEESE,
    Ingredients.PEPPERONI,
    Ingredients.CHICKEN,
    Ingredients.BEEF,
  ],
  [Recipe.FISHERMAN]: [
    Ingredients.DOUGH,
    Ingredients.CREAM_SAUCE,
    Ingredients.CHEESE,
    Ingredients.TUNA,
    Ingredients.PEPPERS,
    Ingredients.OLIVES,
  ],
  [Recipe.MOUNTAIN]: [
    Ingredients.DOUGH,
    Ingredients.CREAM_SAUCE,
    Ingredients.CHEESE,
    Ingredients.HAM,
    Ingredients.BLUE_CHEESE,
    Ingredients.POTATOS,
  ],
  [Recipe.COUNTRY]: [
    Ingredients.DOUGH,
    Ingredients.CREAM_SAUCE,
    Ingredients.CHICKEN,
    Ingredients.GOAT_CHEESE,
    Ingredients.MUSHROOMS,
    Ingredients.POTATOS,
  ],
  [Recipe.VERDE]: [
    Ingredients.DOUGH,
    Ingredients.TOMATO_SAUCE,
    Ingredients.HAM,
    Ingredients.MUSHROOMS,
    Ingredients.PEPPERS,
    Ingredients.OLIVES,
  ],
  [Recipe.OF_THE_SEA]: [
    Ingredients.DOUGH,
    Ingredients.CREAM_SAUCE,
    Ingredients.CHEESE,
    Ingredients.SALMON,
    Ingredients.TUNA,
    Ingredients.HERBS,
  ],
  [Recipe.CANNIBAL]: [
    Ingredients.DOUGH,
    Ingredients.TOMATO_SAUCE,
    Ingredients.CHEESE,
    Ingredients.HAM,
    Ingredients.CHICKEN,
    Ingredients.BEEF,
    Ingredients.ONIONS,
  ],
  [Recipe.MEXICAN]: [
    Ingredients.DOUGH,
    Ingredients.TOMATO_SAUCE,
    Ingredients.CHEESE,
    Ingredients.PEPPERONI,
    Ingredients.MUSHROOMS,
    Ingredients.PEPPERS,
    Ingredients.OLIVES,
    Ingredients.ONIONS,
  ],
};

// @todo
export const ingredientPrices: Record<Ingredients, number> = {
  [Ingredients.DOUGH]: 0,
  [Ingredients.TOMATO_SAUCE]: 0,
  [Ingredients.CREAM_SAUCE]: 0,
  [Ingredients.HAM]: 0,
  [Ingredients.PEPPERONI]: 0,
  [Ingredients.CHICKEN]: 0,
  [Ingredients.BEEF]: 0,
  [Ingredients.SALMON]: 0,
  [Ingredients.TUNA]: 0,
  [Ingredients.CHEESE]: 0,
  [Ingredients.GOAT_CHEESE]: 0,
  [Ingredients.BLUE_CHEESE]: 0,
  [Ingredients.MUSHROOMS]: 0,
  [Ingredients.PEPPERS]: 0,
  [Ingredients.POTATOS]: 0,
  [Ingredients.OLIVES]: 0,
  [Ingredients.HERBS]: 0,
  [Ingredients.ONIONS]: 0,
  [Ingredients.HONEY]: 0,
  [Ingredients.PINEAPPLE]: 0,
};

// @todo
export const recipePrices: Record<Recipe, number> = {
  [Recipe.MARGHERITA]: 0,
  [Recipe.GOAT_HONEY]: 0,
  [Recipe.CARNE]: 0,
  [Recipe.REGINA]: 0,
  [Recipe.PEPPERONI]: 0,
  [Recipe.THREE_CHEESE]: 0,
  [Recipe.NORWEGIAN]: 0,
  [Recipe.BOLLYWOOD]: 0,
  [Recipe.VEGGIE]: 0,
  [Recipe.HAWAI]: 0,
  [Recipe.THREE_MEAT]: 0,
  [Recipe.FISHERMAN]: 0,
  [Recipe.MOUNTAIN]: 0,
  [Recipe.COUNTRY]: 0,
  [Recipe.VERDE]: 0,
  [Recipe.OF_THE_SEA]: 0,
  [Recipe.CANNIBAL]: 0,
  [Recipe.MEXICAN]: 0,
};

export const recipeSatisfactionNeeded: Record<Recipe, number> = {
  [Recipe.MARGHERITA]: 0,
  [Recipe.GOAT_HONEY]: 0,
  [Recipe.CARNE]: 0,
  [Recipe.REGINA]: 20,
  [Recipe.PEPPERONI]: 20,
  [Recipe.THREE_CHEESE]: 30,
  [Recipe.NORWEGIAN]: 30,
  [Recipe.BOLLYWOOD]: 40,
  [Recipe.VEGGIE]: 40,
  [Recipe.HAWAI]: 50,
  [Recipe.THREE_MEAT]: 50,
  [Recipe.FISHERMAN]: 60,
  [Recipe.MOUNTAIN]: 60,
  [Recipe.COUNTRY]: 70,
  [Recipe.VERDE]: 70,
  [Recipe.OF_THE_SEA]: 80,
  [Recipe.CANNIBAL]: 90,
  [Recipe.MEXICAN]: 100,
};

export const ingredientsKeyboardDefaultMapping: Record<
  Ingredients,
  ArrayElement<typeof validKeyboardKey>
> = {
  [Ingredients.DOUGH]: 'D',
  [Ingredients.TOMATO_SAUCE]: 'T',
  [Ingredients.CREAM_SAUCE]: 'C',
  [Ingredients.HAM]: 'H',
  [Ingredients.PEPPERONI]: 'P',
  [Ingredients.CHICKEN]: 'V',
  [Ingredients.BEEF]: 'F',
  [Ingredients.SALMON]: 'S',
  [Ingredients.TUNA]: 'U',
  [Ingredients.CHEESE]: 'M',
  [Ingredients.GOAT_CHEESE]: 'G',
  [Ingredients.BLUE_CHEESE]: 'B',
  [Ingredients.MUSHROOMS]: 'R',
  [Ingredients.PEPPERS]: 'E',
  [Ingredients.POTATOS]: 'Q',
  [Ingredients.OLIVES]: 'O',
  [Ingredients.HERBS]: 'I',
  [Ingredients.ONIONS]: 'N',
  [Ingredients.HONEY]: 'Y',
  [Ingredients.PINEAPPLE]: 'A',
};

export const defaultConfiguration: Configuration = {
  language: Language.EN,
  globalVolume: 100,
  musicVolume: 100,
  soundVolume: 100,
  muted: false,
  keyboardMap: ingredientsKeyboardDefaultMapping,
  game: {
    recipes: [Recipe.MARGHERITA, Recipe.GOAT_HONEY, Recipe.CARNE],
    ingredients: Object.entries(
      Object.values(Ingredients).map((i): [Ingredients, number] => [i, 0])
    ) as unknown as Record<Ingredients, number>,
    money: 100,
    satisfaction: 5,
    tutorial: false,
  },
};

export const PLAY_MUSIC_EVENT = 'PLAY_MUSIC';
export const PLAY_SOUND_EVENT = 'PLAY_SOUND';

export const IngredientsImageMap: Record<Ingredients, ImgAssetUrl> = {
  [Ingredients.DOUGH]: 'dough.png',
  [Ingredients.TOMATO_SAUCE]: 'tomato-sauce.png',
  [Ingredients.CREAM_SAUCE]: 'cream.png',
  [Ingredients.HAM]: 'ham.png',
  [Ingredients.PEPPERONI]: 'pepperoni.png',
  [Ingredients.CHICKEN]: 'chicken.png',
  [Ingredients.BEEF]: 'beef.png',
  [Ingredients.SALMON]: 'salmon.png',
  [Ingredients.TUNA]: 'tuna.png',
  [Ingredients.CHEESE]: 'mozzarella.png',
  [Ingredients.GOAT_CHEESE]: 'goat-cheese.png',
  [Ingredients.BLUE_CHEESE]: 'blue-cheese.png',
  [Ingredients.MUSHROOMS]: 'mushroom.png',
  [Ingredients.PEPPERS]: 'peppers.png',
  [Ingredients.POTATOS]: 'potato.png',
  [Ingredients.OLIVES]: 'olives.png',
  [Ingredients.HERBS]: 'origan.png',
  [Ingredients.ONIONS]: 'onions.png',
  [Ingredients.HONEY]: 'honey.png',
  [Ingredients.PINEAPPLE]: 'pineapple.png',
};

export const ROUND_DURATION = 120;
export const SATISFACTION_EARN_PER_CLIENT = 0.15;
export const SATISFACTION_LOST_PER_CLIENT = 0.1;
export const SATISFACTION_EARN_ROUND_FINISHED = 1;

export const SatisfactionClientNumberLinks: Array<Array<[number, number]>> = [
  [
    [0, 15],
    [10, 12],
  ],
  [
    [15, 25],
    [12, 13],
  ],
  [
    [25, 35],
    [14, 16],
  ],
  [
    [35, 45],
    [16, 18],
  ],
  [
    [45, 55],
    [20, 22],
  ],
  [
    [55, 65],
    [22, 24],
  ],
  [
    [65, 75],
    [24, 26],
  ],
  [
    [75, 90],
    [26, 28],
  ],
  [
    [90, 100],
    [28, 30],
  ],
];
