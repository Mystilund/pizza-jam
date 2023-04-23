import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCook } from '../../../contexts/cook-context';
import { ScrollbarStyle } from '../../../theme/components/generic-style';
import { IngredientsPerRecipe } from '../../../utils/constants';
import { Ingredients } from '../../../utils/types';
import { OrderTicketPizza } from '../order-ticket-pizza';
import { Pizza } from '../pizza';
import { IngredientButton } from './ingredient-button';

export const PizzaMaker = () => {
  const { t } = useTranslation();
  const {
    currentIndex,
    currentClient,
    isGamePaused,
    onSkipClient,
    onUseIngredient: ctxOnUseIngredient,
    onPizzaError,
    onPizzaFinished,
  } = useCook();
  const [pizzaState, setPizzaState] = useState<Ingredients[]>([]);

  // Bind the SEND button
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        !currentClient ||
        IngredientsPerRecipe[currentClient.expectation].length !==
          pizzaState.length
      ) {
        return;
      }

      if (event.code === 'Space') {
        onPizzaFinished();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [currentClient, onPizzaFinished, pizzaState.length]);

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
          <Box position="absolute" left="14%" top="60%" zIndex={5}>
            <Button
              display="block"
              w="100%"
              size="md"
              colorScheme="red"
              onClick={onSkipClient}
            >
              {t('cook.skip')}
            </Button>
            <Button
              mt={3}
              display="block"
              w="100%"
              size="md"
              colorScheme="green"
              onClick={onPizzaFinished}
              isDisabled={
                !currentClient ||
                IngredientsPerRecipe[currentClient.expectation].length !==
                  pizzaState.length
              }
              h="auto"
              py={2}
            >
              <Text>{t('cook.send')}</Text>
              <Divider my={1} />
              <Text>({t('cook.space')})</Text>
            </Button>
          </Box>
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
          maxH="68%"
          overflowY="auto"
          sx={{
            ...ScrollbarStyle,
          }}
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
