import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Button, Flex, HStack } from '@chakra-ui/react';

import { Infobox } from './info-card';
import { IngredientsExplanationModal } from './ingredients-explanation-modal';
import { SatisfactionExplanationModal } from './satisfaction-explanation-modal';

export const HelpCard = () => (
  <Infobox title="Help">
    <Flex
      flex={1}
      flexDir="column"
      gap={2}
      justifyContent="space-evenly"
      pt="10px"
    >
      <HStack py="5px">
        <InfoOutlineIcon />
        <SatisfactionExplanationModal />
      </HStack>
      <HStack py="5px">
        <InfoOutlineIcon />
        <IngredientsExplanationModal />
      </HStack>
      <HStack py="5px">
        <InfoOutlineIcon />
        <Button
          variant="link"
          color="inherit"
          _hover={{ textDecoration: 'underline' }}
        >
          How do we play the game ?
        </Button>
      </HStack>
    </Flex>
  </Infobox>
);
