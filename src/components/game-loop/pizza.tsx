import { Box, BoxProps } from '@chakra-ui/react';

import {
  CDN_URL,
  IngredientsImageMap,
  IngredientsPerRecipe,
} from '../../utils/constants';
import { Ingredients, Recipe } from '../../utils/types';

type PizzaProps = {
  recipe: Recipe;
  ingredientsList: Ingredients[];
} & BoxProps;

export const Pizza = ({ recipe, ingredientsList, ...boxProps }: PizzaProps) => {
  const recipeIngredients = IngredientsPerRecipe[recipe];

  return (
    <Box position="relative" {...boxProps}>
      {recipeIngredients.map((recipeIngredient, index) => {
        const ingredientImage = IngredientsImageMap[recipeIngredient];
        const ingredientHasBeenAdded =
          ingredientsList.includes(recipeIngredient);

        return (
          <Box
            key={recipeIngredient}
            position="absolute"
            inset={0}
            zIndex={index + 1}
            background={
              ingredientHasBeenAdded
                ? `url("${CDN_URL}/images/${ingredientImage}") no-repeat center center`
                : 'transparent'
            }
            backgroundSize="cover"
          />
        );
      })}
    </Box>
  );
};
