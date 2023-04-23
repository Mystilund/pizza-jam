import { CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  chakra,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { useGame } from '../../../contexts/game-context';
import { useGameLoop } from '../../../contexts/game-loop-context';
import { computeCartPrice } from '../../../utils/calculator';
import { translateIngredients } from '../../../utils/translators';
import { Ingredients } from '../../../utils/types';
import { Coin, IngredientIconMap } from '../../icons/icons';
import { OrderTicket } from '../order-ticket';

type OrderIngredientCartProps = {
  onRemoveIngredient: (ingredient: Ingredients) => void;
  ingredientsList: Partial<Record<Ingredients, number>>;
};

export const OrderIngredientCart = ({
  ingredientsList,
  onRemoveIngredient,
}: OrderIngredientCartProps) => {
  const { t } = useTranslation();
  const { configuration } = useGame();
  const { buyCart, cart } = useGameLoop();

  if (Object.values(ingredientsList).length === 0) {
    return (
      <OrderTicket title={t('preparation.cart.cart')}>
        <Text mt="26px">{t('preparation.cart.empty')}</Text>
      </OrderTicket>
    );
  }

  return (
    <OrderTicket title={t('preparation.cart.cart')}>
      <Grid
        mt="24px"
        templateColumns="max-content max-content max-content max-content"
        columnGap="15px"
        rowGap="25px"
        alignItems="center"
      >
        {(Object.entries(ingredientsList) as Array<[Ingredients, number]>).map(
          ([ingredient, count]) => {
            const Icon = chakra(IngredientIconMap[ingredient]);

            return (
              <Fragment key={ingredient}>
                <GridItem h="25px" pt="5px">
                  <Text>{translateIngredients(t, ingredient)}</Text>
                </GridItem>
                <GridItem alignSelf="self-end">
                  <Icon
                    boxSize="24px"
                    aria-label={translateIngredients(t, ingredient)}
                  />
                </GridItem>
                <GridItem h="25px" pt="5px">
                  x{count}
                </GridItem>
                <GridItem h="25px" alignSelf="self-end">
                  <IconButton
                    variant="ghost"
                    height="25px"
                    icon={<CloseIcon color="red.500" />}
                    aria-label="Close"
                    onClick={() => onRemoveIngredient(ingredient)}
                    _hover={{}}
                  />
                </GridItem>
              </Fragment>
            );
          }
        )}
      </Grid>
      <Text mt="25px" h="25px" pt="5px">
        <chakra.span>
          {t('preparation.cart.totalCost', { total: computeCartPrice(cart) })}
        </chakra.span>
        <Icon
          as={Coin}
          boxSize="20px"
          verticalAlign="middle"
          color="yellow.500"
        />
      </Text>
      <Text h="25px" pt="5px">
        <chakra.span>
          {t('preparation.cart.moneyLeft', {
            total: configuration.game.money - computeCartPrice(cart),
          })}
        </chakra.span>
        <Icon as={Coin} boxSize="20px" verticalAlign="sub" color="yellow.500" />
      </Text>
      <Button
        fontFamily="Lato, Arial, sans-serif"
        mt="30px"
        colorScheme="green"
        onClick={buyCart}
      >
        {t('preparation.cart.buyButton')}
      </Button>
    </OrderTicket>
  );
};
