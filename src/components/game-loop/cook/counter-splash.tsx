import { chakra, shouldForwardProp, Text } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { STOP_MUSIC_EVENT } from '../../../utils/constants';

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

type CounterSplashProps = {
  onCountFinished: VoidFunction;
};

export const CounterSplash = ({ onCountFinished }: CounterSplashProps) => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(STOP_MUSIC_EVENT));
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((x) => x - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      onCountFinished();
    }
  }, [count, onCountFinished]);

  if (count === 0) {
    return null;
  }

  return (
    <ChakraBox
      position="absolute"
      w="100%"
      top="50%"
      animate={{
        left: ['150%', '52%', '50%', '-50%'],
        translateY: ['-50%', '-50%', '-50%', '-50%'],
        translateX: ['-50%', '-50%', '-50%', '-50%'],
      }}
      // @ts-ignore no problem in operation, although type error appears.
      transition={{
        duration: 1,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
      fontSize={80}
      fontFamily="ActionComics, Impact, Lato, sans-serif"
      textTransform="uppercase"
      textAlign="center"
      color="orange.300"
      textShadow="0 0 10px #000"
      zIndex={10}
    >
      <Text>{count}</Text>
    </ChakraBox>
  );
};
