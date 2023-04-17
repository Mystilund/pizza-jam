import {
  Button,
  chakra,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBoolean,
} from '@chakra-ui/react';

import { Cheese, Chicken, Salmon, Tomato } from '../icons/icons';

export const IngredientsExplanationModal = () => {
  const [isModalOpen, setIsModalOpen] = useBoolean(false);

  return (
    <>
      <Button
        variant="link"
        color="inherit"
        _hover={{ textDecoration: 'underline' }}
        onClick={() => setIsModalOpen.on()}
      >
        Ingredients
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
          <ModalHeader>Ingredients</ModalHeader>
          <ModalBody>
            <Text>
              <Icon as={Cheese} viewBox="10px" verticalAlign="center" mr={1} />
              <chakra.span>
                To make pizzas, you need some ingredients. If you can't make a
                pizza, the clients will not be happy, making you lose
                satisfaction.
              </chakra.span>
            </Text>
            <Text mt={2}>
              <Icon as={Tomato} viewBox="10px" verticalAlign="center" mr={1} />
              <chakra.span>
                Your money is only useful to pay for ingredients and buy
                recipes. You'll earn some after each pizza sell.
              </chakra.span>
            </Text>
            <Text mt={2}>
              <Icon as={Chicken} viewBox="10px" verticalAlign="center" mr={1} />
              <chakra.span>
                You know approximately how many people will come in your
                restaurant each day, so you can prepare accordingly. You also
                know what kind of pizza you unlocked, so don't buy chicken if
                you are not able to make any pizza with chicken in it.
              </chakra.span>
            </Text>
            <Text mt={2}>
              <Icon as={Salmon} viewBox="10px" verticalAlign="center" mr={1} />
              <chakra.span>
                To check your stock of ingredients and buy some, you can click
                on the button{' '}
                <chakra.strong color="orange.300">ingredients</chakra.strong> on
                top of the screen.
              </chakra.span>
            </Text>
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
