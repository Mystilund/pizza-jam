import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { CDN_URL } from '../../../utils/constants';

export const Workspace = () => {
  const [topMetalShutterPosition, setTopMetalShutterPosition] = useState('0px');

  useEffect(() => {
    setTopMetalShutterPosition('-100%');
  }, []);

  return (
    <>
      <Box
        position="absolute"
        inset={0}
        zIndex={1}
        bg={`url("${CDN_URL}/images/kitchen-render-back.jpg")`}
        bgSize="contain"
      />
      <Box
        position="absolute"
        top={topMetalShutterPosition}
        left={0}
        right={0}
        h="100%"
        w="100%"
        zIndex={2}
        bg={`url("${CDN_URL}/images/game-metal-shutter.png")`}
        bgSize="contain"
        transition="top ease 2s"
      />
      <Box
        position="absolute"
        inset={0}
        zIndex={3}
        bg={`url("${CDN_URL}/images/kitchen-render-front.png")`}
        bgSize="contain"
      />
    </>
  );
};
