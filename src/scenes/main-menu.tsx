import { AspectRatio, Button, Flex, Image } from '@chakra-ui/react';

import { CenterBGLoop } from '../components/center-bg-loop';
import { useGame } from '../contexts/game-context';
import { usePlayMusicOnMount } from '../hooks/use-play-music-on-mount';
import { MenuStyle } from '../theme/components/generic-style';
import { CDN_URL } from '../utils/constants';
import { Scene } from '../utils/types';

export const MainMenuScene = () => {
  const { goToScene } = useGame();

  usePlayMusicOnMount('funiculi-funicula.mp3');

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
        {...MenuStyle.menu}
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
