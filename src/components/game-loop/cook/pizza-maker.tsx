import { Box, Button, Flex } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useCook } from '../../../contexts/cook-context';
import { IngredientsPerRecipe } from '../../../utils/constants';
import { Ingredients } from '../../../utils/types';
import { OrderTicketPizza } from '../order-ticket-pizza';
import { Pizza } from '../pizza';
import { IngredientButton } from './ingredient-button';

export const PizzaMaker = () => {
  const {
    currentIndex,
    currentClient,
    isGamePaused,
    onSkipClient,
    onUseIngredient: ctxOnUseIngredient,
    onPizzaError,
  } = useCook();
  const [pizzaState, setPizzaState] = useState<Ingredients[]>([]);

  // When we go to a next client, we reset the used Ingredient
  useEffect(() => {
    setPizzaState([]);
  }, [currentIndex]);

  // Calculate the next ingredient based on the recipe and the already used ingredients
  const nextIngredient = useMemo(() => {
    if (!currentClient) {
      return undefined;
    }

    const recipeIngredients = IngredientsPerRecipe[currentClient.expectation];
    const remainingIngredients = recipeIngredients.filter(
      (ingredient) => !pizzaState.includes(ingredient)
    );

    return remainingIngredients[0];
  }, [currentClient, pizzaState]);

  // When an ingredient is used, we look if it's the right one or not
  const onUseIngredient = useCallback(
    (ingredient: Ingredients) => {
      console.log('next : ', nextIngredient, 'used : ', ingredient);
      if (!nextIngredient) {
        return;
      }

      if (ingredient === nextIngredient) {
        setPizzaState([...pizzaState, ingredient]);
        ctxOnUseIngredient(ingredient);
      } else {
        onPizzaError();
      }
    },
    [ctxOnUseIngredient, nextIngredient, onPizzaError, pizzaState]
  );

  // The button at the bottom of the screen
  const ingredientButtons = useMemo(() => {
    return Object.values(Ingredients).map((ingredient) => (
      <IngredientButton
        key={ingredient}
        ingredient={ingredient}
        onUseIngredient={onUseIngredient}
      />
    ));
  }, [onUseIngredient]);

  return (
    <>
      {currentClient && (
        <>
          <Button
            size="lg"
            colorScheme="red"
            position="absolute"
            left="14%"
            top="60%"
            zIndex={5}
            onClick={onSkipClient}
          >
            SKIP
          </Button>
          <Pizza
            recipe={currentClient.expectation}
            ingredientsList={pizzaState}
            position="absolute"
            left="30%"
            w="20%"
            top="50%"
            transform="rotateX(45deg)"
            _after={{
              content: '""',
              display: 'block',
              pb: '100%',
            }}
            zIndex={4}
          />
        </>
      )}
      <Flex
        position="absolute"
        bottom="5px"
        left={0}
        right={0}
        zIndex={5}
        gap={1}
        alignItems="center"
      >
        {ingredientButtons}
      </Flex>
      {!isGamePaused && !!currentClient && (
        <Box
          position="absolute"
          top="80px"
          zIndex={11}
          right="10px"
          bg="gray.200"
          p="20px"
        >
          <OrderTicketPizza
            recipe={currentClient.expectation}
            ingredientsChecklist={pizzaState}
          />
        </Box>
      )}
    </>
  );
};
