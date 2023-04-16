import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';

import { useGame } from '../../../../contexts/game-context';
import { PreparationView } from '../../../../scenes/game-loop/preparation';
import { ScrollbarStyle } from '../../../../theme/components/generic-style';
import {
  CDN_URL,
  IngredientsPerRecipe,
  recipePrices,
  recipeSatisfactionNeeded,
} from '../../../../utils/constants';
import { translateRecipe } from '../../../../utils/translators';
import { Recipe } from '../../../../utils/types';
import { Coin, Heart } from '../../../icons/icons';
import { OrderTicket } from '../../order-ticket';
import { ParallelogramBox } from '../../parallelogram-box';
import { Pizza } from '../../pizza';

type PreparationRecipesViewProps = {
  onChangeView: (view: PreparationView) => void;
};

export const PreparationRecipesView = ({
  onChangeView,
}: PreparationRecipesViewProps) => {
  const { configuration, setConfiguration } = useGame();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const recipeNote = useRef<HTMLDivElement>(null);

  const buyRecipe = (recipe: Recipe) => {
    if (
      configuration.game.satisfaction >= recipeSatisfactionNeeded[recipe] &&
      configuration.game.money >= recipePrices[recipe]
    ) {
      setConfiguration({
        ...configuration,
        game: {
          ...configuration.game,
          money: configuration.game.money - recipePrices[recipe],
          recipes: [...configuration.game.recipes, recipe],
        },
      });
    }
  };

  const closeIngredientList = useCallback(() => {
    if (recipeNote.current) {
      recipeNote.current.style.right = '-300px';
      setTimeout(() => {
        setSelectedRecipe(null);
        if (recipeNote.current) {
          recipeNote.current.style.right = '';
        }
      }, 800);
    }
  }, [recipeNote]);

  return (
    <Box
      h="100%"
      bg={`url("${CDN_URL}/images/wood-loop-bg.jpg")`}
      overflow="hidden"
      position="relative"
      py="20px"
    >
      <Box h="100%" py="30px" overflow="auto" sx={ScrollbarStyle}>
        <Flex px="30px" alignItems="center" gap={2}>
          <Button
            colorScheme="orange"
            leftIcon={<ArrowBackIcon />}
            onClick={() => onChangeView(PreparationView.MAIN_VIEW)}
          >
            Back
          </Button>
          <ParallelogramBox
            ml="auto"
            Icon={Heart}
            iconColor="hotpink"
            label={`Satisfaction : ${configuration.game.satisfaction}`}
          />
          <ParallelogramBox
            Icon={Coin}
            iconColor="gold"
            label={`Money : ${configuration.game.money}`}
          />
        </Flex>
        <Box flex={1} pt="20px">
          <Flex w="100%" flexWrap="wrap" gap={3} justifyContent="center">
            {Object.values(Recipe).map((recipe) => {
              const hasUnlockedRecipe =
                configuration.game.recipes.includes(recipe);

              return (
                <Box key={recipe} mb="20px">
                  <Box
                    background={`url("${CDN_URL}/images/pizza-recipe-bg.jpg")`}
                    backgroundSize="cover"
                    py="20px"
                  >
                    <Button
                      variant="unstyled"
                      display="block"
                      h="auto"
                      px="20px"
                      onClick={() => setSelectedRecipe(recipe)}
                      color="white"
                      _hover={{}}
                    >
                      <Heading fontFamily="cursive" fontSize="2em">
                        {translateRecipe(recipe)}
                      </Heading>
                      <Pizza
                        recipe={recipe}
                        ingredientsList={IngredientsPerRecipe[recipe]}
                        w="300px"
                        h="300px"
                        mt="15px"
                        {...(!configuration.game.recipes.includes(recipe) && {
                          filter: 'brightness(0.1)',
                        })}
                      />
                    </Button>
                    {!hasUnlockedRecipe && (
                      <Flex p="5px 10px" justifyContent="space-between">
                        <Button
                          colorScheme="blackAlpha"
                          leftIcon={<Heart color="hotpink" />}
                          cursor="default"
                        >
                          {recipeSatisfactionNeeded[recipe]} required
                        </Button>
                        <Button
                          colorScheme="green"
                          rightIcon={<Coin color="gold" />}
                          isDisabled={
                            configuration.game.satisfaction <
                              recipeSatisfactionNeeded[recipe] ||
                            configuration.game.money < recipePrices[recipe]
                          }
                          onClick={() => buyRecipe(recipe)}
                        >
                          {recipePrices[recipe]} required
                        </Button>
                      </Flex>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Box>
      <Box
        ref={recipeNote}
        position="absolute"
        top="20px"
        right={selectedRecipe ? '10px' : '-300px'}
        w="300px"
        transition="all ease .8s"
        p="20px 10px"
        background="gray.100"
        zIndex={20}
      >
        {selectedRecipe && (
          <OrderTicket recipe={selectedRecipe} onClose={closeIngredientList} />
        )}
      </Box>
    </Box>
  );
};
