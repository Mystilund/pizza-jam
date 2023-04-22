import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBoolean,
} from '@chakra-ui/react';

export const GameExplanationModal = () => {
  const [isModalOpen, setIsModalOpen] = useBoolean(false);

  return (
    <>
      <Button
        variant="link"
        color="inherit"
        _hover={{ textDecoration: 'underline' }}
        onClick={() => setIsModalOpen.on()}
      >
        How do we play the game ?
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen.off()}
        size="xl"
        isCentered
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent
          bg="gray.900"
          color="gray.200"
          border="1px solid"
          borderColor="gray.400"
        >
          <ModalHeader>How do we play the game ?</ModalHeader>
          <ModalBody>
            <Text>TODO</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" onClick={() => setIsModalOpen.off()}>
              Back
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
