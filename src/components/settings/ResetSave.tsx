import {
  Button,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { useGame } from '../../contexts/game-context';
import { defaultConfiguration } from '../../utils/constants';

export const ResetSave = () => {
  const { t } = useTranslation();
  const { configuration, setConfiguration } = useGame();
  const [isModalOpen, setIsModalOpen] = useBoolean(false);

  const reset = () => {
    setConfiguration({
      ...configuration,
      game: {
        ...defaultConfiguration.game,
      },
    });
    setIsModalOpen.off();
  };

  return (
    <>
      <GridItem></GridItem>
      <GridItem>
        <Button
          colorScheme="orange"
          variant="link"
          onClick={() => setIsModalOpen.on()}
        >
          {t('settingsMenu.resetSave')}
        </Button>
      </GridItem>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen.off()}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('settingsMenu.reset.modalHeader')}</ModalHeader>
          <ModalBody>
            <Text>{t('settingsMenu.reset.modalBody')}</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={2}
              onClick={() => setIsModalOpen.off()}
            >
              {t('back')}
            </Button>
            <Button colorScheme="green" onClick={reset}>
              {t('settingsMenu.reset.submitButton')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
