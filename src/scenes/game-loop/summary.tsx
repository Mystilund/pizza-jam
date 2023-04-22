import { Box, Button, Center, Flex } from '@chakra-ui/react';

import { GaugeCard } from '../../components/game-loop/summary/gauge-card';
import { StatsCard } from '../../components/game-loop/summary/stats-card';
import { SummaryCard } from '../../components/game-loop/summary/summary-card';
import { useGame } from '../../contexts/game-context';
import { useGameLoop } from '../../contexts/game-loop-context';
import { usePlayMusicOnMount } from '../../hooks/use-play-music-on-mount';
import { Scene } from '../../utils/types';

export const GameLoopSummaryScene = () => {
  const { goToScene } = useGame();
  const { summaryData } = useGameLoop();

  usePlayMusicOnMount('funiculi-funicula.mp3');

  return (
    <Center w="100%" h="100%" p="20px" bg="gray.200" position="relative">
      <Flex flexDir="column" w="100%" alignItems="center" gap={5}>
        <Flex w="100%" gap={5} justifyContent="space-around">
          <GaugeCard
            satisfactionEarned={summaryData.satisfactionEarned}
            clientsSuccess={summaryData.clientsSuccess}
            totalClients={summaryData.totalClients}
            moneyEarned={summaryData.moneyEarned}
            moneyRatio={
              summaryData.moneyEarned / summaryData.moneyPossibleTotal
            }
            hasBonus={
              summaryData.clientsError + summaryData.clientsSkipped === 0
            }
          />
          <StatsCard
            totalClients={summaryData.totalClients}
            clientsSkipped={summaryData.clientsSkipped}
            clientsError={summaryData.clientsError}
            clientsSuccess={summaryData.clientsSuccess}
          />
        </Flex>
        <Flex w="100%" gap={5} justifyContent="space-around">
          <SummaryCard />
          <Flex
            flexDir="column"
            justifyContent="flex-end"
            alignItems="center"
            pb="20px"
            gap={5}
          >
            <Box>
              <Button
                colorScheme="orange"
                onClick={() => goToScene(Scene.GAME_LOOP_PREPARATION)}
              >
                Go back in the kitchen
              </Button>
            </Box>
            <Box>
              <Button
                colorScheme="teal"
                onClick={() => goToScene(Scene.MAIN_MENU)}
              >
                Go back to the menu
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Center>
  );
};
