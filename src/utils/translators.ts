import { TFunction } from 'i18next';

import { Ingredients, Language, Recipe } from './types';

export const translateLanguage = (t: TFunction, lang: Language) => {
  switch (lang) {
    case Language.EN:
      return t('settingsMenu.en');
    case Language.FR:
      return t('settingsMenu.fr');
    default:
      return 'Ø';
  }
};
// @todo: use tFunc to translate
export const translateIngredients = (t: TFunction, ingredient: Ingredients) => {
  switch (ingredient) {
    case Ingredients.PINEAPPLE:
      return t('ingredients.pineapple');
    case Ingredients.BEEF:
      return t('ingredients.beef');
    case Ingredients.BLUE_CHEESE:
      return t('ingredients.blueCheese');
    case Ingredients.CHICKEN:
      return t('ingredients.chicken');
    case Ingredients.CREAM_SAUCE:
      return t('ingredients.creamSauce');
    case Ingredients.DOUGH:
      return t('ingredients.dough');
    case Ingredients.GOAT_CHEESE:
      return t('ingredients.goatCheese');
    case Ingredients.HAM:
      return t('ingredients.ham');
    case Ingredients.HONEY:
      return t('ingredients.honey');
    case Ingredients.CHEESE:
      return t('ingredients.cheese');
    case Ingredients.MUSHROOMS:
      return t('ingredients.mushrooms');
    case Ingredients.OLIVES:
      return t('ingredients.olives');
    case Ingredients.ONIONS:
      return t('ingredients.onions');
    case Ingredients.HERBS:
      return t('ingredients.herbs');
    case Ingredients.PEPPERONI:
      return t('ingredients.pepperoni');
    case Ingredients.PEPPERS:
      return t('ingredients.peppers');
    case Ingredients.POTATOS:
      return t('ingredients.potatos');
    case Ingredients.SALMON:
      return t('ingredients.salmon');
    case Ingredients.TOMATO_SAUCE:
      return t('ingredients.tomatoSauce');
    case Ingredients.TUNA:
      return t('ingredients.tuna');
    default:
      return 'Ø';
  }
};

export const translateRecipe = (t: TFunction, recipe: Recipe) => {
  switch (recipe) {
    case Recipe.BOLLYWOOD:
      return t('recipes.bollywood');
    case Recipe.CANNIBAL:
      return t('recipes.cannibal');
    case Recipe.CARNE:
      return t('recipes.carne');
    case Recipe.COUNTRY:
      return t('recipes.country');
    case Recipe.FISHERMAN:
      return t('recipes.fisherman');
    case Recipe.GOAT_HONEY:
      return t('recipes.goatHoney');
    case Recipe.HAWAI:
      return t('recipes.hawai');
    case Recipe.MARGHERITA:
      return t('recipes.margherita');
    case Recipe.MEXICAN:
      return t('recipes.mexican');
    case Recipe.MOUNTAIN:
      return t('recipes.mountain');
    case Recipe.NORWEGIAN:
      return t('recipes.norwegian');
    case Recipe.OF_THE_SEA:
      return t('recipes.seaPizza');
    case Recipe.REGINA:
      return t('recipes.regina');
    case Recipe.THREE_CHEESE:
      return t('recipes.threeCheese');
    case Recipe.PEPPERONI:
      return t('recipes.pepperoni');
    case Recipe.THREE_MEAT:
      return t('recipes.threeMeats');
    case Recipe.VEGGIE:
      return t('recipes.veggie');
    case Recipe.VERDE:
      return t('recipes.verde');
    default:
      return 'Ø';
  }
};
