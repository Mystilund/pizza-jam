import { Button, Center, Text, useBoolean } from '@chakra-ui/react';

import { GameApp } from './game-app';

export const App = () => {
  const [isReady, setIsReady] = useBoolean(false);

  if (isReady) {
    return <GameApp />;
  }

  return (
    <Center w="100%" h="100%" color="gray.200" flexDir="column">
      <Text>
        In order to make the game works properly and to avoid issue with the
        browser
      </Text>
      <Text>You need to interact with the page</Text>
      <Text>Press the button to start the game 😉</Text>
      <Button
        variant="outline"
        colorScheme="orange"
        mt="20px"
        onClick={() => setIsReady.on()}
      >
        Accept
      </Button>
    </Center>
  );
};
