import { Box, Center, Spinner, Text, useBoolean } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { AssetsManager } from './managers/assets-manager';
import { AudioManager } from './managers/audio-manager';
import { SceneManager } from './managers/scene-manager';

export const GameApp = () => {
  const [isReady, setIsReady] = useBoolean(false);
  const [hasError, setHasError] = useBoolean(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (loadingProgress === 100) {
      clearInterval(intervalRef.current);
      setIsReady.on();
    }
  }, [loadingProgress, setIsReady]);

  if (!isReady && hasError) {
    // @todo: display error page
    return <Text>ERROR !</Text>;
  }

  if (!isReady) {
    return (
      <Center color="white" gap={2} w="100%" h="100%">
        <Box>
          <Spinner size="lg" color="orange.500" />
        </Box>
        <Text>Loading... ({loadingProgress}%)</Text>
        <AssetsManager
          onSuccess={() => setIsReady.on()}
          onError={() => setHasError.on()}
          onProgress={(percentage) => setLoadingProgress(percentage)}
        />
      </Center>
    );
  }

  return (
    <>
      <AudioManager />
      <SceneManager />
    </>
  );
};
