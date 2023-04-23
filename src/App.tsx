import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { useState } from 'react';

import { CenterBGLoop } from './components/center-bg-loop';
import { GameApp } from './game-app';
import { CDN_URL } from './utils/constants';

export const App = () => {
  const [page, setPage] = useState(0);
  const [isReady, setIsReady] = useBoolean(false);

  if (isReady) {
    return <GameApp />;
  }

  return (
    <CenterBGLoop
      w="100%"
      h="100%"
      color="gray.200"
      flexDir="column"
      p="20px"
      position="relative"
    >
      <AspectRatio ratio={25 / 11} w="100%" maxW="500px">
        <Image src={`${CDN_URL}/images/logo.png`} />
      </AspectRatio>
      <Flex
        flexDir="column"
        gap={1}
        bg="blackAlpha.900"
        p="20px"
        w="600px"
        height="283px"
        borderRadius={20}
      >
        {page === 0 && <Jam />}
        {page === 1 && <Disclaimer />}
        {page === 2 && <StartGame onStart={() => setIsReady.on()} />}
        <Flex justifyContent="space-between" mt="auto" mb={0}>
          {page !== 0 && (
            <IconButton
              ml={0}
              mr="auto"
              colorScheme="orange"
              onClick={() => setPage((x) => x - 1)}
              icon={<ArrowLeftIcon />}
              aria-label="Previous"
              isDisabled={page === 0}
            />
          )}
          {page !== 2 && (
            <IconButton
              mr={0}
              ml="auto"
              colorScheme="orange"
              onClick={() => setPage((x) => x + 1)}
              icon={<ArrowRightIcon />}
              aria-label="Next"
              isDisabled={page === 2}
            />
          )}
        </Flex>
      </Flex>
      <Social />
    </CenterBGLoop>
  );
};

const Jam = () => (
  <>
    <Heading fontSize="24px" mb="10px">
      The project
    </Heading>
    <Divider my={1} />
    <Text>
      This game was made for the{' '}
      <Link href="https://itch.io/jam/gamedevjs-2023" target="_blank">
        Gamedev.js Jam 2023
      </Link>
    </Text>
    <Text>
      If you don't know what a game jam is click{' '}
      <Link
        color="orange.400"
        href="https://en.wikipedia.org/wiki/Game_jam"
        target="_blank"
        textDecoration="underline"
      >
        here
      </Link>
    </Text>
    <Text>
      The theme of this jam is{' '}
      <chakra.span color="teal.400" fontWeight="bold">
        Time
      </chakra.span>
    </Text>
    <Text>
      The game is also open source, if you're interested, you can take a look at
      my Github.
    </Text>
  </>
);

const StartGame = ({ onStart }: { onStart: VoidFunction }) => (
  <>
    <Text>
      This game is half a management simulation, half a time challenging game
      (of course it needs to fit the theme)
    </Text>
    <Text>You'll play the owner and cook of a pizza restaurant</Text>
    <Text>
      The goal of the game is to get the more satisfaction you can and get
      money, unlock all the recipes and obviously to have fun
    </Text>
    <Box textAlign="center">
      <Button
        variant="outline"
        colorScheme="orange"
        mt="20px"
        onClick={onStart}
      >
        Start
      </Button>
    </Box>
  </>
);

const Social = () => (
  <Box
    p="20px"
    bg="blackAlpha.900"
    borderRadius={10}
    position="absolute"
    bottom="5px"
    right="5px"
  >
    <Heading fontSize="24px" mb="10px">
      Social
    </Heading>
    <Text>
      <Link
        href="https://twitter.com/LundProd"
        target="_blank"
        color="orange.400"
        textDecoration="underline"
      >
        Twitter
      </Link>
    </Text>
    <Text>
      <Link
        href="https://github.com/mystilund"
        target="_blank"
        color="orange.400"
        textDecoration="underline"
      >
        Github
      </Link>
    </Text>
    <Text>
      <Link
        href="https://mystilund.itch.io/"
        target="_blank"
        color="orange.400"
        textDecoration="underline"
      >
        Itch.io
      </Link>
    </Text>
  </Box>
);

const Disclaimer = () => (
  <>
    <Heading fontSize="24px" mb="10px">
      Disclaimer & Information
    </Heading>
    <Divider my={1} />
    <Text>First, it's my first real game and I'm happy I finished it.</Text>
    <Text>
      English is not my native language so I'm sorry if there are mistakes in
      the translations.
    </Text>
    <Text>The game is optimized for Chrome.</Text>
    <Text mt={3}>
      For the tech side, the game is just using React & Chakra-UI. That's all.
    </Text>
  </>
);
