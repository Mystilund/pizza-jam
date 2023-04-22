import { Box, useBoolean } from '@chakra-ui/react';

import { CounterSplash } from '../../components/game-loop/cook/counter-splash';
import { GameFinishedSplash } from '../../components/game-loop/cook/game-finished-splash';
import { GameScreen } from '../../components/game-loop/cook/game-screen';
import { GameTimer } from '../../components/game-loop/cook/game-timer';
import { useCook } from '../../contexts/cook-context';
import { usePlayMusicOnMount } from '../../hooks/use-play-music-on-mount';

export const GameLoopCookScene = () => {
  const { hasGameStarted, startGame, finishGame, isFinished } = useCook();
  const [isSplashCounterDisplayed, setIsSplashCounterDisplayed] =
    useBoolean(true);

  usePlayMusicOnMount('tarantela-napolitana.mp3', {
    enabled: true,
    loop: false,
  });

  const onSplashCounterFinished = () => {
    setIsSplashCounterDisplayed.off();
    startGame();
  };

  return (
    <Box position="relative" w="100%" h="100%">
      {isSplashCounterDisplayed && (
        <CounterSplash onCountFinished={onSplashCounterFinished} />
      )}
      {hasGameStarted && <GameTimer onTimerEnd={finishGame} />}
      {isFinished && <GameFinishedSplash />}
      <GameScreen />
    </Box>
  );
};
