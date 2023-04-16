import { Ingredients, Language, Recipe } from './types';

// @todo: use tFunc to translate
export const translateLanguage = (lang: Language) => {
  switch (lang) {
    case Language.EN:
      return 'English';
    case Language.FR:
      return 'Français';
    default:
      return 'Ø';
  }
};

// @todo: use tFunc to translate
export const translateIngredients = (ingredient: Ingredients) => {
  switch (ingredient) {
    case Ingredients.PINEAPPLE:
      return 'Pineapple';
    case Ingredients.BEEF:
      return 'Beef';
    case Ingredients.BLUE_CHEESE:
      return 'Blue cheese';
    case Ingredients.CHICKEN:
      return 'Chicken';
    case Ingredients.CREAM_SAUCE:
      return 'Cream';
    case Ingredients.DOUGH:
      return 'Dough';
    case Ingredients.GOAT_CHEESE:
      return 'Goat cheese';
    case Ingredients.HAM:
      return 'Ham';
    case Ingredients.HONEY:
      return 'Honey';
    case Ingredients.CHEESE:
      return 'Cheese';
    case Ingredients.MUSHROOMS:
      return 'Mushrooms';
    case Ingredients.OLIVES:
      return 'Olives';
    case Ingredients.ONIONS:
      return 'Onions';
    case Ingredients.HERBS:
      return 'Herbs';
    case Ingredients.PEPPERONI:
      return 'Pepperoni';
    case Ingredients.PEPPERS:
      return 'Peppers';
    case Ingredients.POTATOS:
      return 'Potatos';
    case Ingredients.SALMON:
      return 'Salmon';
    case Ingredients.TOMATO_SAUCE:
      return 'Tomato sauce';
    case Ingredients.TUNA:
      return 'Tuna';
    default:
      return 'Ø';
  }
};

// @todo: use tFunc to translate
export const translateRecipe = (recipe: Recipe) => {
  switch (recipe) {
    case Recipe.BOLLYWOOD:
      return 'Bollywood';
    case Recipe.CANNIBAL:
      return 'Cannibal';
    case Recipe.CARNE:
      return 'Carne';
    case Recipe.COUNTRY:
      return 'Country';
    case Recipe.FISHERMAN:
      return 'Fisherman';
    case Recipe.GOAT_HONEY:
      return 'Goat-Honey';
    case Recipe.HAWAI:
      return 'Hawai';
    case Recipe.MARGHERITA:
      return 'Margherita';
    case Recipe.MEXICAN:
      return 'Mexican';
    case Recipe.MOUNTAIN:
      return 'Mountain';
    case Recipe.NORWEGIAN:
      return 'Norwegian';
    case Recipe.OF_THE_SEA:
      return 'Pizza of the sea';
    case Recipe.REGINA:
      return 'Regina';
    case Recipe.THREE_CHEESE:
      return '3 cheese';
    case Recipe.PEPPERONI:
      return 'Pepperoni';
    case Recipe.THREE_MEAT:
      return '3 meats';
    case Recipe.VEGGIE:
      return 'Veggie';
    case Recipe.VERDE:
      return 'Verde';
    default:
      return 'Ø';
  }
};
