import { Ingredients, Recipe } from '../types';
import { ingredientPrices } from './ingredients';

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

export const recipePrices: Record<Recipe, number> = {
  [Recipe.MARGHERITA]: 0,
  [Recipe.GOAT_HONEY]: 0,
  [Recipe.CARNE]: 0,
  [Recipe.REGINA]: 150,
  [Recipe.PEPPERONI]: 200,
  [Recipe.THREE_CHEESE]: 250,
  [Recipe.NORWEGIAN]: 250,
  [Recipe.BOLLYWOOD]: 300,
  [Recipe.VEGGIE]: 300,
  [Recipe.HAWAI]: 300,
  [Recipe.THREE_MEAT]: 350,
  [Recipe.FISHERMAN]: 350,
  [Recipe.MOUNTAIN]: 350,
  [Recipe.COUNTRY]: 400,
  [Recipe.VERDE]: 400,
  [Recipe.OF_THE_SEA]: 450,
  [Recipe.CANNIBAL]: 450,
  [Recipe.MEXICAN]: 500,
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

export const pizzaPrices = Object.fromEntries(
  Object.values(Recipe).map((recipe) => [
    recipe,
    Math.round(
      IngredientsPerRecipe[recipe].reduce((acc, ingredient) => {
        return acc + ingredientPrices[ingredient];
      }, 0) *
        // multiplier by 2.4 if the pizza has 4 ingredients, 2.5 if 5, etc
        (2 + IngredientsPerRecipe[recipe].length / 10)
    ),
  ])
) as Record<Recipe, number>;
