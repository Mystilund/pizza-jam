import { Box, Button, Center, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { GaugeCard } from '../../components/game-loop/summary/gauge-card';
import { StatsCard } from '../../components/game-loop/summary/stats-card';
import { SummaryCard } from '../../components/game-loop/summary/summary-card';
import { useGame } from '../../contexts/game-context';
import { useGameLoop } from '../../contexts/game-loop-context';
import { usePlayMusicOnMount } from '../../hooks/use-play-music-on-mount';
import { CDN_URL } from '../../utils/constants';
import { Scene } from '../../utils/types';

export const GameLoopSummaryScene = () => {
  const { t } = useTranslation();
  const { goToScene } = useGame();
  const { summaryData } = useGameLoop();

  usePlayMusicOnMount('funiculi-funicula.mp3');

  return (
    <Center
      w="100%"
      h="100%"
      p="20px"
      bg={`url("${CDN_URL}/images/bg-night.jpg")`}
      backgroundSize="cover"
      position="relative"
    >
      <Grid w="90%" mx="auto" templateColumns="50% 50%" gap={5}>
        <GridItem>
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
        </GridItem>
        <GridItem mx="auto">
          <StatsCard
            totalClients={summaryData.totalClients}
            clientsSkipped={summaryData.clientsSkipped}
            clientsError={summaryData.clientsError}
            clientsSuccess={summaryData.clientsSuccess}
          />
        </GridItem>
        <GridItem>
          <SummaryCard />
        </GridItem>
        <GridItem>
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
                {t('backToKitchen')}
              </Button>
            </Box>
            <Box>
              <Button
                colorScheme="teal"
                onClick={() => goToScene(Scene.MAIN_MENU)}
              >
                {t('backToMenu')}
              </Button>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
    </Center>
  );
};
