import { TimeIcon } from '@chakra-ui/icons';
import { Flex, HStack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useGameLoop } from '../../../contexts/game-loop-context';
import { calcTimePerPizzaFromRange } from '../../../utils/calculator';
import { ROUND_DURATION } from '../../../utils/constants';
import { User } from '../../icons/icons';
import { Infobox } from '../info-card';

export const ExpectationCard = () => {
  const { t } = useTranslation();
  const { clientRange } = useGameLoop();

  const [maxPizzaTime, minPizzaTime] = calcTimePerPizzaFromRange(clientRange);

  return (
    <Infobox title={t('preparation.expectationTitle') as string} maxW="320px">
      <Flex flex={1} flexDir="column" gap={2} justifyContent="space-evenly">
        <HStack>
          <User />
          <Text>
            {t('preparation.clientsEstimated', {
              min: clientRange[0],
              max: clientRange[1],
            })}
          </Text>
        </HStack>
        <HStack>
          <TimeIcon />
          <Text>
            {t('preparation.timePerPizza', {
              min: minPizzaTime,
              max: maxPizzaTime,
            })}
          </Text>
        </HStack>
        <Text fontSize="0.8em">
          {t('preparation.timerNote', { duration: ROUND_DURATION })}
        </Text>
      </Flex>
    </Infobox>
  );
};
