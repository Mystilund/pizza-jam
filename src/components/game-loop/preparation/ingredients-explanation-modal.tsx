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
import { Trans, useTranslation } from 'react-i18next';

import { Cheese, Chicken, Salmon, Tomato } from '../../icons/icons';

export const IngredientsExplanationModal = () => {
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
        {t('preparation.help.ingredients.button')}
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
          <ModalHeader>{t('preparation.help.ingredients.button')}</ModalHeader>
          <ModalBody>
            <Text>
              <Icon as={Cheese} viewBox="10px" verticalAlign="center" mr={1} />
              <chakra.span>
                {t('preparation.help.ingredients.line1')}
              </chakra.span>
            </Text>
            <Text mt={2}>
              <Icon as={Tomato} viewBox="10px" verticalAlign="center" mr={1} />
              <chakra.span>
                {t('preparation.help.ingredients.line2')}
              </chakra.span>
            </Text>
            <Text mt={2}>
              <Icon as={Chicken} viewBox="10px" verticalAlign="center" mr={1} />
              <chakra.span>
                {t('preparation.help.ingredients.line3')}
              </chakra.span>
            </Text>
            <Text mt={2}>
              <Icon as={Salmon} viewBox="10px" verticalAlign="center" mr={1} />
              <chakra.span>
                <Trans
                  i18nKey="preparation.help.ingredients.line4"
                  components={{
                    bold: <chakra.strong color="orange.300" />,
                  }}
                />
              </chakra.span>
            </Text>
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
