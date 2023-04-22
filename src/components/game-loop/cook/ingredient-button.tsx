import {
  Button,
  ButtonProps,
  Divider,
  Icon,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';

import { useCook } from '../../../contexts/cook-context';
import { useGame } from '../../../contexts/game-context';
import { Ingredients } from '../../../utils/types';
import { IngredientIconMap } from '../../icons/icons';

type IngredientButtonProps = {
  ingredient: Ingredients;
  onUseIngredient: (ingredient: Ingredients) => void;
};

const activeStyle: { position: ButtonProps['position']; top: string } = {
  position: 'relative',
  top: '5px',
};

export const IngredientButton = ({
  ingredient,
  onUseIngredient,
}: IngredientButtonProps) => {
  const { configuration } = useGame();
  const { usedIngredients } = useCook();
  const [isActive, setIsActive] = useBoolean(false);

  // computed it once since it won't change
  const ingredientsCount = useMemo(() => Object.values(Ingredients), []);

  const stockRemaining =
    configuration.game.ingredients[ingredient] - usedIngredients[ingredient];
  const hasStock = stockRemaining > 0;

  // Get the key mapped
  const keyboardShortcut = useMemo(
    () => configuration.keyboardMap[ingredient].toUpperCase(),
    [configuration.keyboardMap, ingredient]
  );

  // To handle the keyboard events
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toUpperCase() === keyboardShortcut && hasStock) {
        setIsActive.on();
        onUseIngredient(ingredient);
        setTimeout(() => {
          setIsActive.off();
        }, 200);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [keyboardShortcut, setIsActive, onUseIngredient, ingredient, hasStock]);

  return (
    <Button
      onClick={() => onUseIngredient(ingredient)}
      bg="blackAlpha.900"
      color="white"
      flexDir="column"
      isDisabled={!hasStock}
      key={ingredient}
      pb={2}
      px={1}
      flex={1}
      maxW={`${100 / ingredientsCount.length}%`}
      h="fit-content"
      borderTop="10px solid"
      borderColor={!hasStock ? 'red.500' : 'green.500'}
      _hover={{
        bg: !hasStock ? 'red.900' : 'green.900',
      }}
      _active={activeStyle}
      _disabled={{
        cursor: 'not-allowed',
      }}
      {...(isActive && activeStyle)}
    >
      <Text w="100%" pt={1} h="24px">
        <Icon as={IngredientIconMap[ingredient]} w="100%" h="100%" />
      </Text>
      <Text>{stockRemaining}</Text>
      <Divider my={1} />
      <Text>{configuration.keyboardMap[ingredient]}</Text>
    </Button>
  );
};
