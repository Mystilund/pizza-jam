import { Box } from '@chakra-ui/react';

import { useCook } from '../../../contexts/cook-context';
import { Clients } from './clients';
import { PizzaMaker } from './pizza-maker';
import { Workspace } from './workspace';

export const GameScreen = () => {
  const { hasGameStarted } = useCook();

  return (
    <Box position="relative" h="100%" w="100%">
      <Clients />
      <Workspace />
      {hasGameStarted && <PizzaMaker />}
    </Box>
  );
};
