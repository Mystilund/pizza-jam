import {
  Box,
  Button,
  chakra,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useBoolean,
} from '@chakra-ui/react';

import {
  SATISFACTION_EARN_PER_CLIENT,
  SATISFACTION_EARN_ROUND_FINISHED,
  SATISFACTION_LOST_PER_CLIENT,
} from '../../../utils/constants';
import { Heart } from '../../icons/icons';

export const SatisfactionExplanationModal = () => {
  const [isModalOpen, setIsModalOpen] = useBoolean(false);

  return (
    <>
      <Button
        variant="link"
        color="inherit"
        _hover={{ textDecoration: 'underline' }}
        onClick={() => setIsModalOpen.on()}
      >
        Satisfaction
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
          <ModalHeader>Satisfaction</ModalHeader>
          <ModalBody>
            <Text>
              The client satisfaction is a metric which increases for each
              client you served correctly.
            </Text>
            <Text mt={1}>
              If you miss a pizza or if the timer finish before you served all
              the clients, this satisfaction decreases.
            </Text>
            <Text mt={1}>
              You can have a satisfaction bonus if you make a pizza for each
              clients of the day.
            </Text>
            <Text mt={1}>
              The more you have satisfaction, the more you have clients. It also
              allows you to buy new recipes by clicking on the button
              <chakra.strong color="orange.300"> Recipes</chakra.strong> on top
              of the screen.
            </Text>
            <Divider my={4} />
            <Box textAlign="center">
              <Box>
                <Text>Client successfully served</Text>
                <HStack justifyContent="center">
                  <Text fontWeight="bold">+{SATISFACTION_EARN_PER_CLIENT}</Text>
                  <Heart color="green" />
                </HStack>
              </Box>
              <Box mt={3}>
                <Text>
                  Bonus when all client are served at the end of the day
                </Text>
                <HStack justifyContent="center">
                  <Text fontWeight="bold">
                    +{SATISFACTION_EARN_ROUND_FINISHED}
                  </Text>
                  <Heart color="green" />
                </HStack>
              </Box>
              <Box mt={3}>
                <Text>Client not served or with a bad pizza</Text>
                <HStack justifyContent="center">
                  <Text fontWeight="bold">-{SATISFACTION_LOST_PER_CLIENT}</Text>
                  <Heart color="red" />
                </HStack>
              </Box>
            </Box>
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
