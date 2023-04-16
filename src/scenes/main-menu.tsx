import { AspectRatio, Button, Flex, Image } from '@chakra-ui/react';
import { useEffect } from 'react';

import { CenterBGLoop } from '../components/center-bg-loop';
import { useGame } from '../contexts/game-context';
import { FlexStyle } from '../theme/components/flex';
import { CDN_URL, PLAY_MUSIC_EVENT } from '../utils/constants';
import { AudioAssetUrl, Scene } from '../utils/types';

export const MainMenuScene = () => {
  const { goToScene } = useGame();

  useEffect(() => {
    const updateEvent = new CustomEvent<{ value: AudioAssetUrl }>(
      PLAY_MUSIC_EVENT,
      {
        detail: { value: 'funiculi-funicula.mp3' },
      }
    );

    window.dispatchEvent(updateEvent);
  }, []);

  return (
    <CenterBGLoop>
      <Flex
        minW="400px"
        w="50%"
        maxW="600px"
        gap="20px"
        p="40px"
        flexDir="column"
        alignItems="center"
        {...FlexStyle.menu}
      >
        <AspectRatio ratio={25 / 11} w="100%">
          <Image src={`${CDN_URL}/images/logo.png`} />
        </AspectRatio>
        <Button
          variant="menu"
          w="300px"
          onClick={() => goToScene(Scene.GAME_LOOP_PREPARATION)}
        >
          Play
        </Button>
        <Button
          variant="menu"
          w="300px"
          onClick={() => goToScene(Scene.SETTINGS)}
        >
          Settings
        </Button>
      </Flex>
    </CenterBGLoop>
  );
};
