import { audioAssets, imgAssets } from './constants';

export enum Language {
  FR = 'fr',
  EN = 'en',
}

export type AudioAssetUrl = ArrayElement<typeof audioAssets>;
export type ImgAssetUrl = ArrayElement<typeof imgAssets>;

export enum Scene {
  MAIN_MENU = 'MAIN_MENU',
  SETTINGS = 'SETTINGS',
  KEYBOARD_SETTINGS = 'KEYBOARD_SETTINGS',
  GAME_LOOP_PREPARATION = 'GAME_LOOP_PREPARATION',
  GAME_LOOP_COOK = 'GAME_LOOP_COOK',
  GAME_LOOP_SUMMARY = 'GAME_LOOP_SUMMARY',
}

export enum Ingredients {
  DOUGH = 'DOUGH',
  TOMATO_SAUCE = 'TOMATO_SAUCE',
  CREAM_SAUCE = 'CREAM_SAUCE',
  HAM = 'HAM',
  PEPPERONI = 'PEPPERONI',
  CHICKEN = 'CHICKEN',
  BEEF = 'BEEF',
  SALMON = 'SALMON',
  TUNA = 'TUNA',
  MOZARELLA = 'MOZARELLA',
  GOAT_CHEESE = 'GOAT_CHEESE',
  BLUE_CHEESE = 'BLUE_CHEESE',
  MUSHROOMS = 'MUSHROOMS',
  PEPPERS = 'PEPPERS',
  POTATOS = 'POTATOS',
  OLIVES = 'OLIVES',
  ORIGAN = 'ORIGAN',
  ONIONS = 'ONIONS',
  HONEY = 'HONEY',
  ANANAS = 'ANANAS',
}

export enum Recipe {
  MARGHERITA = 'MARGHERITA',
  GOAT_HONEY = 'GOAT_HONEY',
  CARNE = 'CARNE',
  REGINA = 'REGINA',
  PEPPERONI = 'PEPPERONI',
  THREE_CHEESE = 'THREE_CHEESE',
  NORWEGIAN = 'NORWEGIAN',
  BOLLYWOOD = 'BOLLYWOOD',
  VEGGIE = 'VEGGIE',
  HAWAI = 'HAWAI',
  THREE_MEAT = 'THREE_MEAT',
  FISHERMAN = 'FISHERMAN',
  MOUNTAIN = 'MOUNTAIN',
  COUNTRY = 'COUNTRY',
  VERDE = 'VERDE',
  OF_THE_SEA = 'OF_THE_SEA',
  CANNIBAL = 'CANNIBAL',
  MEXICAN = 'MEXICAN',
}

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Configuration = {
  language: Language;
  globalVolume: number;
  musicVolume: number;
  soundVolume: number;
  muted: boolean;
  keyboardMap: Record<Ingredients, string>;
  game: {
    recipes: Recipe[];
    ingredients: Record<Ingredients, number>;
    money: number;
    satisfaction: number;
  };
};
