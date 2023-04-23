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
import { useTranslation } from 'react-i18next';

import { ScrollbarStyle } from '../../../theme/components/generic-style';

export const GameExplanationModal = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useBoolean(false);

  return (
    <>
      <Button
        variant="link"
        color="gold"
        _hover={{ textDecoration: 'underline' }}
        onClick={() => setIsModalOpen.on()}
      >
        {t('preparation.help.gameExplanation.button')}
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen.off()}
        size="xl"
        isCentered
        motionPreset="slideInRight"
        autoFocus={false}
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
          <ModalHeader>
            {t('preparation.help.gameExplanation.button')}
          </ModalHeader>
          <ModalBody>
            <Heading fontSize="20px">
              {t('preparation.help.gameExplanation.title1')}
            </Heading>
            <Divider my={2} />
            <Text>{t('preparation.help.gameExplanation.line1')}</Text>
            <Heading mt="15px" fontSize="20px">
              {t('preparation.help.gameExplanation.title2')}
            </Heading>
            <Divider my={2} />
            <Text>{t('preparation.help.gameExplanation.line2')}</Text>
            <Text mt={2}>{t('preparation.help.gameExplanation.line3')}</Text>
            <Text mt={2}>{t('preparation.help.gameExplanation.line4')}</Text>
            <Heading mt="15px" fontSize="20px">
              {t('preparation.help.gameExplanation.title3')}
            </Heading>
            <Divider my={2} />
            <Text>{t('preparation.help.gameExplanation.line5')}</Text>
            <Text mt={2}>{t('preparation.help.gameExplanation.line6')}</Text>
            <Text mt={2}>{t('preparation.help.gameExplanation.line7')}</Text>
            <Text mt={2}>{t('preparation.help.gameExplanation.line8')}</Text>
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
