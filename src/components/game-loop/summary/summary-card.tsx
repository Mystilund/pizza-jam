import { Box, Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useGame } from '../../../contexts/game-context';
import { translateIngredients } from '../../../utils/translators';
import { Ingredients } from '../../../utils/types';
import { Coin, Heart, IngredientIconMap } from '../../icons/icons';
import { Infobox } from '../info-card';

export const SummaryCard = () => {
  const { t } = useTranslation();
  const { configuration } = useGame();

  return (
    <Infobox title={t('summary.summaryTitle') as string} minW="585px" h="auto">
      <Box pt="20px">
        <Box>
          <Text as="span">
            {t('summary.totalMoney', { total: configuration.game.money })}
          </Text>
          <Icon as={Coin} ml={1} color="gold" verticalAlign="text-bottom" />
        </Box>
        <Box>
          <Text as="span">
            {t('summary.totalSatisfaction', {
              total: configuration.game.satisfaction,
            })}
          </Text>
          <Icon as={Heart} ml={1} color="hotpink" verticalAlign="text-bottom" />
        </Box>
        <Grid templateColumns="33% 33% 33%" gap={1} mt="5px">
          {Object.values(Ingredients).map((ingredient) => (
            <GridItem key={ingredient}>
              <Icon as={IngredientIconMap[ingredient]} mr={1} />
              <Text as="span">
                {translateIngredients(t, ingredient)} x
                {configuration.game.ingredients[ingredient]}
              </Text>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Infobox>
  );
};
