import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { Fragment } from 'react';

import { IngredientsPerRecipe } from '../../utils/constants';
import { translateIngredients } from '../../utils/translators';
import { Ingredients, Recipe } from '../../utils/types';
import { AnimatedCheckMarkCircleIcon, IngredientIconMap } from '../icons/icons';

type OrderTicketProps = {
  recipe: Recipe;
  onClose: VoidFunction;
  ingredientsChecklist?: Ingredients[];
};

export const OrderTicket = ({
  recipe,
  onClose,
  ingredientsChecklist = [],
}: OrderTicketProps) => {
  return (
    <Box
      bg="repeating-linear-gradient(transparent 0px, transparent 24px, teal 25px)"
      fontFamily="cursive"
      pl="20px"
      pb="20px"
      position="relative"
      _before={{
        content: '""',
        width: '2px',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: '15px',
        backgroundColor: 'rgba(255,0,0,0.6)',
      }}
    >
      <Heading fontSize="1.8em" lineHeight="25px">
        Ingredients :
      </Heading>
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
                <Text>{translateIngredients(ingredient)}</Text>
              </GridItem>
              <GridItem alignSelf="self-end">
                <Icon
                  boxSize="24px"
                  aria-label={translateIngredients(ingredient)}
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
      <IconButton
        position="absolute"
        colorScheme="teal"
        top="-15px"
        right={0}
        icon={<CloseIcon />}
        onClick={onClose}
        aria-label="Close"
      />
    </Box>
  );
};
