import {
  Box,
  Button,
  Center,
  Link,
  Spinner,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { AssetsManager } from './managers/assets-manager';
import { AudioManager } from './managers/audio-manager';
import { SceneManager } from './managers/scene-manager';

export const GameApp = () => {
  const { t } = useTranslation();
  const [isReady, setIsReady] = useBoolean(false);
  const [hasError, setHasError] = useBoolean(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (loadingProgress === 100) {
      setIsReady.on();
    }
  }, [loadingProgress, setIsReady]);

  if (!isReady && hasError) {
    return (
      <Center w="100%" h="100%" color="white" bg="gray.900" flexDir="column">
        <Text>{t('errorLoading.line1')}</Text>
        <Text>{t('errorLoading.line2')}</Text>
        <Text>
          <Trans
            i18nKey="errorLoading.line3"
            components={{
              twitterLink: (
                <Link href="https://twitter.com/LundProd" target="_blank" />
              ),
            }}
          />
        </Text>
        <Button
          mt={4}
          colorScheme="red"
          onClick={() => {
            setHasError.off();
            setIsReady.on();
          }}
        >
          {t('errorLoading.button')}
        </Button>
      </Center>
    );
  }

  if (!isReady) {
    return (
      <Center color="white" gap={2} w="100%" h="100%">
        <Box>
          <Spinner size="lg" color="orange.500" />
        </Box>
        <Text>Loading... ({loadingProgress}%)</Text>
        <Text opacity={0} fontFamily="AlarmClock">
          Font Load
        </Text>
        <Text opacity={0} fontFamily="ActionComics">
          Font Load
        </Text>
        <AssetsManager
          onError={() => {
            setHasError.on();
          }}
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
