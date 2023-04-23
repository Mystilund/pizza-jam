import { Icon, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { getIngredientColor } from '../../../utils/calculator';
import { ingredientPrices } from '../../../utils/constants';
import { translateIngredients } from '../../../utils/translators';
import { Ingredients } from '../../../utils/types';
import { Can, Coin, IngredientIconMap } from '../../icons/icons';

type IngredientCanProps = {
  ingredient: Ingredients;
};

export const IngredientCan = ({ ingredient }: IngredientCanProps) => {
  const { t } = useTranslation();
  const ingredientColorMap = useMemo(getIngredientColor, []);

  return (
    <>
      <Icon as={Can} color={ingredientColorMap[ingredient]} w="100%" h="auto" />
      <Icon
        as={IngredientIconMap[ingredient]}
        position="absolute"
        w="40px"
        h="auto"
        left="50%"
        transform="translateX(-50%)"
        top="100px"
      />
      <Text
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        top="178px"
      >
        {ingredientPrices[ingredient]}
        <Icon
          as={Coin}
          boxSize="20px"
          verticalAlign="middle"
          color="yellow.500"
        />
      </Text>
      <Text
        position="absolute"
        left="50%"
        transform="translateX(-50%) translateY(-50%)"
        top="50px"
        textAlign="center"
        fontWeight="bold"
      >
        {translateIngredients(t, ingredient)}
      </Text>
    </>
  );
};
