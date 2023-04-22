import { Box, chakra, shouldForwardProp } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';

const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const GameFinishedSplash = () => {
  return (
    <Box
      w="390px"
      h="180px"
      top="50%"
      left="50%"
      position="fixed"
      transform="translate(-50%, -50%)"
      zIndex={10}
    >
      <ChakraBox
        w="100%"
        h="100%"
        transform="scale(0)"
        animate={{
          scale: [0, 1.4],
        }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{
          duration: 2,
          ease: 'easeInOut',
        }}
        fontSize={40}
        fontFamily="ActionComics, Impact, Lato, sans-serif"
        textTransform="uppercase"
        textAlign="center"
        color="orange.300"
        textShadow="0 0 10px #000"
      >
        Day's over !
      </ChakraBox>
    </Box>
  );
};
