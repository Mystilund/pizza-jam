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
import { Trans, useTranslation } from 'react-i18next';

import {
  SATISFACTION_EARN_PER_CLIENT,
  SATISFACTION_EARN_ROUND_FINISHED,
  SATISFACTION_LOST_PER_CLIENT,
} from '../../../utils/constants';
import { Heart } from '../../icons/icons';

export const SatisfactionExplanationModal = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useBoolean(false);

  return (
    <>
      <Button
        variant="link"
        color="inherit"
        _hover={{ textDecoration: 'underline' }}
        onClick={() => setIsModalOpen.on()}
      >
        {t('preparation.help.satisfaction.button')}
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
          <ModalHeader>{t('preparation.help.satisfaction.button')}</ModalHeader>
          <ModalBody>
            <Text>{t('preparation.help.satisfaction.line1')}</Text>
            <Text mt={1}>{t('preparation.help.satisfaction.line2')}</Text>
            <Text mt={1}>{t('preparation.help.satisfaction.line3')}</Text>
            <Text mt={1}>
              <Trans
                i18nKey="preparation.help.satisfaction.line4"
                components={{
                  bold: <chakra.strong color="orange.300" />,
                }}
              />
            </Text>
            <Divider my={4} />
            <Box textAlign="center">
              <Box>
                <Text>{t('preparation.help.satisfaction.clientSuccess')}</Text>
                <HStack justifyContent="center">
                  <Text fontWeight="bold">+{SATISFACTION_EARN_PER_CLIENT}</Text>
                  <Heart color="green" />
                </HStack>
              </Box>
              <Box mt={3}>
                <Text>{t('preparation.help.satisfaction.bonus')}</Text>
                <HStack justifyContent="center">
                  <Text fontWeight="bold">
                    +{SATISFACTION_EARN_ROUND_FINISHED}
                  </Text>
                  <Heart color="green" />
                </HStack>
              </Box>
              <Box mt={3}>
                <Text>{t('preparation.help.satisfaction.clientError')}</Text>
                <HStack justifyContent="center">
                  <Text fontWeight="bold">-{SATISFACTION_LOST_PER_CLIENT}</Text>
                  <Heart color="red" />
                </HStack>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" onClick={() => setIsModalOpen.off()}>
              {t('back')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
