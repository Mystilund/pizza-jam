import { TimeIcon } from '@chakra-ui/icons';
import { Flex, HStack, Text } from '@chakra-ui/react';

import { useGameLoop } from '../../../contexts/game-loop-context';
import { calcTimePerPizzaFromRange } from '../../../utils/calculator';
import { ROUND_DURATION } from '../../../utils/constants';
import { User } from '../../icons/icons';
import { Infobox } from '../info-card';

export const ExpectationCard = () => {
  const { clientRange } = useGameLoop();

  const [minPizzaTime, maxPizzaTime] = calcTimePerPizzaFromRange(clientRange);

  return (
    <Infobox title="Expectation" maxW="320px">
      <Flex flex={1} flexDir="column" gap={2} justifyContent="space-evenly">
        <HStack>
          <User />
          <Text>
            Clients estimated : {`${clientRange[0]} - ${clientRange[1]}`}
          </Text>
        </HStack>
        <HStack>
          <TimeIcon />
          <Text>Time per pizza : {`${maxPizzaTime} - ${minPizzaTime}s`}</Text>
        </HStack>
        <Text fontSize="0.8em">
          Note : The duration of a round is always {ROUND_DURATION}s
        </Text>
      </Flex>
    </Infobox>
  );
};
