import { Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { useGame } from '../../contexts/game-context';
import { ValidKeyboardKey, validKeyboardKey } from '../../utils/constants';

type KeyboardOverlayProps = {
  onCancel: VoidFunction;
  onAssign: (key: ValidKeyboardKey) => void;
};

type ErrorType = 'invalid' | 'alreadyAssigned';

export const KeyboardOverlay = ({
  onAssign,
  onCancel,
}: KeyboardOverlayProps) => {
  const { configuration } = useGame();
  // const [invalidKey, setInvalidKey] = useBoolean(false);
  // const [alreadyAssignedKeyError, setAlreadyAssignedKeyError] = useBoolean(false);
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
        return 'The key is already assigned to another ingredient';
      case 'invalid':
        return 'The key is invalid, please press an alphanumeric key';
      default:
        return null;
    }
  }, [error]);

  return (
    <Flex
      position="absolute"
      inset={0}
      textAlign="center"
      bg="blackAlpha.900"
      justifyContent="center"
      flexDir="column"
    >
      <Heading variant="menu">Assign a key</Heading>
      <Text>Press any alphanumeric character to set the key as shortcut</Text>
      <Text>Press escape to cancel</Text>
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
