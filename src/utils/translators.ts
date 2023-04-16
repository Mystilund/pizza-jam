import { Ingredients, Language } from './types';

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
    case Ingredients.ANANAS:
      return 'Ananas';
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
    case Ingredients.MOZARELLA:
      return 'Mozarella';
    case Ingredients.MUSHROOMS:
      return 'Mushrooms';
    case Ingredients.OLIVES:
      return 'Olives';
    case Ingredients.ONIONS:
      return 'Onions';
    case Ingredients.ORIGAN:
      return 'Origan';
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
