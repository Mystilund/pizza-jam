import { chakra, Grid, GridItem, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { IngredientsPerRecipe } from '../../utils/constants';
import { translateIngredients } from '../../utils/translators';
import { Ingredients, Recipe } from '../../utils/types';
import { AnimatedCheckMarkCircleIcon, IngredientIconMap } from '../icons/icons';
import { OrderTicket } from './order-ticket';

type OrderTicketProps = {
  recipe: Recipe;
  onClose?: VoidFunction;
  ingredientsChecklist?: Ingredients[];
};

export const OrderTicketPizza = ({
  recipe,
  onClose,
  ingredientsChecklist = [],
}: OrderTicketProps) => {
  const { t } = useTranslation();

  return (
    <OrderTicket title="Ingredients :" onClose={onClose}>
      <Grid
        mt="24px"
        templateColumns="max-content max-content max-content"
        columnGap="15px"
        rowGap="25px"
      >
        {IngredientsPerRecipe[recipe].map((ingredient) => {
          const Icon = chakra(IngredientIconMap[ingredient]);

          return (
            <Fragment key={ingredient}>
              <GridItem h="25px" pt="5px">
                <Text
                  textDecoration={
                    ingredientsChecklist.includes(ingredient)
                      ? 'line-through'
                      : ''
                  }
                >
                  {translateIngredients(t, ingredient)}
                </Text>
              </GridItem>
              <GridItem alignSelf="self-end">
                <Icon
                  boxSize="24px"
                  aria-label={translateIngredients(t, ingredient)}
                />
              </GridItem>
              <GridItem alignSelf="self-end">
                {ingredientsChecklist.includes(ingredient) && (
                  <AnimatedCheckMarkCircleIcon size="sm" />
                )}
              </GridItem>
            </Fragment>
          );
        })}
      </Grid>
    </OrderTicket>
  );
};
