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

import { useGame } from '../../contexts/game-context';
import { defaultConfiguration } from '../../utils/constants';

export const ResetSave = () => {
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
          Reset save ?
        </Button>
      </GridItem>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen.off()}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure ?</ModalHeader>
          <ModalBody>
            <Text>Once you validate, all your progress will be reset.</Text>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="gray"
              mr={2}
              onClick={() => setIsModalOpen.off()}
            >
              Back
            </Button>
            <Button colorScheme="green" onClick={reset}>
              I'm sure!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
