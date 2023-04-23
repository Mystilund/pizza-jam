import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useCook } from '../../../contexts/cook-context';
import { PLAY_SOUND_EVENT } from '../../../utils/constants';
import { AudioAssetUrl } from '../../../utils/types';
import { Client } from '../../icons/icons';

const CLIENT_WIDTH_PERCENTAGE = 19.8;
const W_TO_H_RATIO = 1.49;

export const Clients = () => {
  const { currentIndex, clients, hasGameStarted } = useCook();
  const [left, setLeft] = useState('100%');
  const [widthClient, setWidthClient] = useState(300);

  useEffect(() => {
    const getClientWidth = () => {
      const gameContainer = document.querySelector('#game-container');

      if (gameContainer) {
        setWidthClient(
          (gameContainer.getBoundingClientRect().width *
            CLIENT_WIDTH_PERCENTAGE) /
            100
        );
      }
    };

    getClientWidth();
    window.addEventListener('resize', getClientWidth);

    return () => {
      window.removeEventListener('resize', getClientWidth);
    };
  }, []);

  useEffect(() => {
    setLeft(
      currentIndex === 0
        ? 'var(--chakra-space-4)'
        : `calc(${-currentIndex * widthClient}px - ${
            currentIndex - 1
          } * var(--chakra-space-4))`
    );
  }, [currentIndex, widthClient]);

  useEffect(() => {
    if (currentIndex !== 0) {
      window.dispatchEvent(
        new CustomEvent<{ value: AudioAssetUrl }>(PLAY_SOUND_EVENT, {
          detail: { value: 'footstep.ogg' },
        })
      );
    }
  }, [currentIndex]);

  return (
    <Box position="absolute" left="6%" right="6%" top={0} zIndex={2} h="64.8%">
      <Flex
        position="absolute"
        left={left}
        bottom={0}
        transition={`left ease ${hasGameStarted ? '1.2s' : '4.5s'}`}
        alignItems="center"
        gap={4}
      >
        {clients.map((client, index) => (
          <Box
            key={index}
            w={`${widthClient}px`}
            h={`${widthClient * W_TO_H_RATIO}px`}
            position="relative"
          >
            <Text
              w="fit-content"
              ml="20%"
              mr="auto"
              position="relative"
              padding="8%"
              fontSize="150%"
              bg="white"
              border="1px solid"
              color="black"
              textAlign="center"
              borderRadius={20}
              _before={{
                content: "''",
                position: 'absolute',
                bottom: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                border: 0,
                borderRightWidth: '30px',
                borderBottomWidth: '20px',
                borderStyle: 'solid',
                borderColor: 'transparent white',
                display: 'block',
                width: 0,
              }}
            >
              {client.error >= 2 || client.skipped
                ? '😫'
                : client.error === 1
                ? '😐'
                : '😀'}
            </Text>
            <Box w="100%" position="absolute" bottom={0} left={0} right={0}>
              <Client
                w="100%"
                h="100%"
                color={client.color}
                skin={client.skin}
                skinColor={client.skinColor}
                hairColor={client.hairColor}
                viewBox={`${widthClient}px`}
                display="block"
              />
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};
