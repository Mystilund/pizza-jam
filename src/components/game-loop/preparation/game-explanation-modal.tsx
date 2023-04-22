import {
  Button,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBoolean,
} from '@chakra-ui/react';

import { ScrollbarStyle } from '../../../theme/components/generic-style';

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
          maxH="500px"
          overflowY="auto"
          sx={{
            ...ScrollbarStyle,
          }}
        >
          <ModalHeader>How do we play the game ?</ModalHeader>
          <ModalBody>
            <Heading fontSize="20px">Preparation</Heading>
            <Divider my={2} />
            <Text>
              First, you need to be prepared. As explained in the ingredient
              window, you'll need to buy some resources to be able to cook your
              pizza. Depending the estimation of clients coming for the day and
              depending what are the recipes you have, you'll be able to buy the
              right ingredients and the right quantity.
            </Text>
            <Heading mt="15px" fontSize="20px">
              Cook & serve clients
            </Heading>
            <Divider my={2} />
            <Text>
              Once you're sure you're prepared, you can click on the button at
              the bottom of the page behind.
            </Text>
            <Text mt={2}>
              The clients will come, each with a specific request. The recipe
              will be displayed on the top right, you have your ingredients at
              the bottom. You need to click on the ingredient or press the
              corresponding key in the right order to make the pizza. If you put
              a wrong ingredient (including one in the recipe but it's not the
              next one), the client will be mad. You can do 2 errors, if you do
              a third one the client go away.
            </Text>
            <Text mt={2}>
              The ingredients are only remove from your stock if you put them on
              a pizza. Meaning if a client leave the restaurant because you made
              too many mistakes, you'll lose the used ingredients. If for some
              reasons you don't prepare yourself properly and you can't do some
              recipes because of a lack of ingredients, you can skip clients.
            </Text>
            <Heading mt="15px" fontSize="20px">
              End of the day
            </Heading>
            <Divider my={2} />
            <Text>
              The day is over when the timer reach 0 or if there are no longer
              clients.
            </Text>
            <Text mt={2}>
              After a day of work, you'll have a summary with how many
              satisfaction you earned/lost, how many money you got, and what is
              the state of your stock.
            </Text>
            <Text mt={2}>
              If you cook a pizza for all the clients of the day, without any
              skip or client leaving, you have a bonus of satisfaction. If the
              timer reach 0 but there are still clients, they are considered as
              skipped ones.
            </Text>
            <Text mt={2}>
              And then you go back to your kitchen preparing a new day,
              purchasing new ingredients and maybe unlocking new recipes !
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
