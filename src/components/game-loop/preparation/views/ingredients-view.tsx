import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useGame } from '../../../../contexts/game-context';
import { useGameLoop } from '../../../../contexts/game-loop-context';
import { PreparationView } from '../../../../scenes/game-loop/preparation';
import { ScrollbarStyle } from '../../../../theme/components/generic-style';
import { computeCartPrice } from '../../../../utils/calculator';
import { CDN_URL, ingredientPrices } from '../../../../utils/constants';
import { Ingredients } from '../../../../utils/types';
import { Coin } from '../../../icons/icons';
import { ParallelogramBox } from '../../parallelogram-box';
import { IngredientCan } from '../ingredient-can';
import { OrderIngredientCart } from '../order-ingredient-cart';

type PreparationIngredientsViewProps = {
  onChangeView: (view: PreparationView) => void;
};

export const PreparationIngredientsView = ({
  onChangeView,
}: PreparationIngredientsViewProps) => {
  const { t } = useTranslation();
  const { configuration } = useGame();
  const { cart, addToCart, removeFromCart, removeOneFromCart } = useGameLoop();

  const virtualMoneyLeft = configuration.game.money - computeCartPrice(cart);

  const hasEnoughMoney = (price: number) => {
    return !!(virtualMoneyLeft >= price);
  };

  return (
    <Box
      position="relative"
      w="100%"
      h="100%"
      overflow="auto"
      sx={{ ...ScrollbarStyle }}
      p="20px"
      bg={`url("${CDN_URL}/images/bg-day.jpg")`}
      backgroundSize="contain"
    >
      <Flex position="relative" py="20px" alignItems="flex-start">
        <Flex flex={1} flexWrap="wrap" gap={4} mb={4}>
          {Object.values(Ingredients).map((ingredient) => (
            <Box
              key={ingredient}
              w="250px"
              position="relative"
              border="5px solid"
              borderColor="orange.900"
              bg="gray.800"
              py="10px"
            >
              <IngredientCan ingredient={ingredient} />
              <Text color="gray.300" textAlign="center">
                {t('preparation.stock', {
                  total: configuration.game.ingredients[ingredient],
                })}
              </Text>
              <Flex justifyContent="center" gap="20px">
                <IconButton
                  icon={<TriangleDownIcon />}
                  colorScheme="red"
                  onClick={() => removeOneFromCart(ingredient)}
                  isDisabled={!cart[ingredient]}
                  aria-label="Remove one from cart"
                />
                <IconButton
                  icon={<TriangleUpIcon />}
                  colorScheme="green"
                  onClick={() => addToCart(ingredient)}
                  isDisabled={!hasEnoughMoney(ingredientPrices[ingredient])}
                  aria-label="Add one to cart"
                />
                <Button
                  leftIcon={<TriangleUpIcon />}
                  colorScheme="green"
                  onClick={() => addToCart(ingredient, 10)}
                  isDisabled={
                    !hasEnoughMoney(ingredientPrices[ingredient] * 10)
                  }
                  aria-label="Add ten to cart"
                >
                  x10
                </Button>
              </Flex>
            </Box>
          ))}
        </Flex>
        <Box minW="300px" zIndex={20} position="sticky" top={0}>
          <Flex gap={2} alignItems="center">
            <Button
              border="2px solid"
              borderColor="orange.800"
              colorScheme="orange"
              onClick={() => onChangeView(PreparationView.MAIN_VIEW)}
            >
              {t('back')}
            </Button>
            <ParallelogramBox
              ml="auto"
              mr={0}
              Icon={Coin}
              iconColor="gold"
              label={
                t('preparation.money', {
                  total: configuration.game.money,
                }) as string
              }
            />
          </Flex>
          <Box
            mt="20px"
            w="300px"
            maxH="500px"
            overflowY="auto"
            background="gray.100"
            p="20px 10px"
            sx={{ ...ScrollbarStyle }}
          >
            <OrderIngredientCart
              onRemoveIngredient={removeFromCart}
              ingredientsList={cart}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
