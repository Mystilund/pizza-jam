import { Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGame } from '../../contexts/game-context';
import { validKeyboardKey } from '../../utils/constants';
import { ValidKeyboardKey } from '../../utils/types';

type KeyboardOverlayProps = {
  onCancel: VoidFunction;
  onAssign: (key: ValidKeyboardKey) => void;
};

type ErrorType = 'invalid' | 'alreadyAssigned';

export const KeyboardOverlay = ({
  onAssign,
  onCancel,
}: KeyboardOverlayProps) => {
  const { t } = useTranslation();
  const { configuration } = useGame();
  const [error, setError] = useState<ErrorType | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const alreadyAssignedKeys = Object.values(configuration.keyboardMap);

      if (e.key === 'Escape') {
        // Quit, do nothing
        onCancel();
      } else if (isValidKey(e.key)) {
        if (alreadyAssignedKeys.find((key) => key === e.key.toUpperCase())) {
          // The key is already assigned
          setError('alreadyAssigned');
        } else {
          // Assign the pressed key
          onAssign(e.key);
        }
      } else {
        // Show an error
        setError('invalid');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onAssign, onCancel, setError, configuration]);

  const errorMsg = useMemo(() => {
    switch (error) {
      case 'alreadyAssigned':
        return t('settingsMenu.keyboardOverlay.alreadyAssigned');
      case 'invalid':
        return t('settingsMenu.keyboardOverlay.invalid');
      default:
        return null;
    }
  }, [error, t]);

  return (
    <Flex
      position="absolute"
      inset={0}
      textAlign="center"
      bg="blackAlpha.900"
      justifyContent="center"
      flexDir="column"
    >
      <Heading variant="menu">
        {t('settingsMenu.keyboardOverlay.assign')}
      </Heading>
      <Text>{t('settingsMenu.keyboardOverlay.pressAlphaKey')}</Text>
      <Text>{t('settingsMenu.keyboardOverlay.pressEsc')}</Text>
      {!!errorMsg && (
        <Text mt={3} color="red.500">
          {errorMsg}
        </Text>
      )}
    </Flex>
  );
};

function isValidKey(key: string): key is ValidKeyboardKey {
  return validKeyboardKey.includes(key.toUpperCase() as ValidKeyboardKey);
}
