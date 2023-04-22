import {
  Configuration,
  Ingredients,
  Language,
  Recipe,
  SummaryData,
} from '../types';
import { ingredientsKeyboardDefaultMapping } from './ingredients';

export const CDN_URL = 'https://d27vevw9zkuexv.cloudfront.net';

export const ROUND_DURATION = 120;
export const SATISFACTION_EARN_PER_CLIENT = 0.15;
export const SATISFACTION_LOST_PER_CLIENT = 0.1;
export const SATISFACTION_EARN_ROUND_FINISHED = 1;
export const PLAY_MUSIC_EVENT = 'PLAY_MUSIC';
export const PAUSE_MUSIC_EVENT = 'PAUSE_MUSIC';
export const RESUME_MUSIC_EVENT = 'RESUME_MUSIC';
export const STOP_MUSIC_EVENT = 'STOP_MUSIC';
export const PLAY_SOUND_EVENT = 'PLAY_SOUND';

export const imgAssets = [
  'logo.png',
  'menu-bg.jpg',
  'pizza-recipe-bg.jpg',
  'wood-loop-bg.jpg',
  'preparation-main-view-bg.jpg',
  'preparation-ingredients-view-bg.jpg',
  'game-background-bg.png',
  'game-front-bg.png',
  'game-metal-shutter.png',
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

export const defaultConfiguration: Configuration = {
  language: Language.EN,
  globalVolume: 100,
  musicVolume: 100,
  soundVolume: 100,
  muted: false,
  keyboardMap: ingredientsKeyboardDefaultMapping,
  game: {
    recipes: [Recipe.MARGHERITA, Recipe.GOAT_HONEY, Recipe.CARNE],
    ingredients: Object.fromEntries(
      Object.values(Ingredients).map((i): [Ingredients, number] => [i, 0])
    ) as unknown as Record<Ingredients, number>,
    money: 250,
    satisfaction: 10,
    tutorial: false,
  },
};

export const initialGameSummary: SummaryData = {
  totalClients: 0,
  clientsSkipped: 0,
  clientsError: 0,
  clientsSuccess: 0,
  satisfactionEarned: 0,
  moneyEarned: 0,
  moneyPossibleTotal: 0,
};

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
