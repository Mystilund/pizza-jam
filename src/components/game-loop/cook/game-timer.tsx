import { chakra, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { useCook } from '../../../contexts/cook-context';
import { ROUND_DURATION } from '../../../utils/constants';

type GameTimerProps = {
  onTimerEnd: VoidFunction;
};

export const GameTimer = ({ onTimerEnd }: GameTimerProps) => {
  const { isGamePaused, isFinished } = useCook();
  const [countdown, setCountdown] = useState(ROUND_DURATION);
  const timer = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (!(isGamePaused || isFinished)) {
      timer.current = setInterval(() => {
        setCountdown((x) => x - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [isGamePaused, isFinished]);

  useEffect(() => {
    if (countdown === 0 && !isFinished) {
      onTimerEnd();
      clearInterval(timer.current);
    }
  }, [countdown, onTimerEnd, isFinished]);

  const minutes = Math.floor(countdown / 60);
  const seconds = Math.floor(countdown % 60);

  return (
    <Text
      bg="black"
      color="white"
      lineHeight="30px"
      p="10px"
      position="absolute"
      top={0}
      left="50%"
      transform="translateX(-50%)"
      border="2px solid white"
      zIndex={10}
      fontFamily="'AlarmClock', 'Lato', Arial, sans-serif"
    >
      <chakra.span>{String(minutes).padStart(2, '0')}</chakra.span>
      <chakra.span>:</chakra.span>
      <chakra.span>{String(seconds).padStart(2, '0')}</chakra.span>
    </Text>
  );
};
