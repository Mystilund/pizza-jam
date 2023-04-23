import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Flex, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Infobox } from '../info-card';
import { GameExplanationModal } from './game-explanation-modal';
import { IngredientsExplanationModal } from './ingredients-explanation-modal';
import { SatisfactionExplanationModal } from './satisfaction-explanation-modal';

export const HelpCard = () => {
  const { t } = useTranslation();

  return (
    <Infobox title={t('preparation.helpTitle') as string} maxW="320px">
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
          <GameExplanationModal />
        </HStack>
      </Flex>
    </Infobox>
  );
};
