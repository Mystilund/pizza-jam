import { Box } from '@chakra-ui/react';

import { usePlayMusicOnMount } from '../../hooks/use-play-music-on-mount';

export const GameLoopSummaryScene = () => {
  usePlayMusicOnMount('funiculi-funicula.mp3');

  return <Box />;
};
