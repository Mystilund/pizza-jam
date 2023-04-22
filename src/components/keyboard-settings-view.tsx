import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { Fragment, useState } from 'react';

import { useGame } from '../contexts/game-context';
import { MenuStyle, ScrollbarStyle } from '../theme/components/generic-style';
import { defaultConfiguration } from '../utils/constants';
import { translateIngredients } from '../utils/translators';
import { Ingredients, ValidKeyboardKey } from '../utils/types';
import { AnimatedCheckMarkCircleIcon } from './icons/icons';
import { KeyboardOverlay } from './settings/KeyboardOverlay';

type KeyboardSettingsViewProps = {
  onBack: VoidFunction;
};

export const KeyboardSettingsView = ({ onBack }: KeyboardSettingsViewProps) => {
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredients | null>(null);
  const [resetPressed, setResetPressed] = useBoolean(false);
  const { configuration, setConfiguration } = useGame();
  const ingredients = Object.values(Ingredients);

  const reset = () => {
    setResetPressed.on();
    setConfiguration({
      ...configuration,
      keyboardMap: defaultConfiguration.keyboardMap,
    });
    setTimeout(() => {
      setResetPressed.off();
    }, 2000);
  };

  const assignKey = (key: ValidKeyboardKey) => {
    setConfiguration({
      ...configuration,
      keyboardMap: {
        ...configuration.keyboardMap,
        [selectedIngredient as Ingredients]: key.toUpperCase(),
      },
    });
    setSelectedIngredient(null);
    (document.activeElement as HTMLElement | null)?.blur();
  };

  return (
    <Box
      minW="400px"
      w="50%"
      maxW="600px"
      p="40px"
      maxH="calc(100% - 40px)"
      overflow="auto"
      position="relative"
      {...MenuStyle.menu}
      sx={{
        ...ScrollbarStyle,
        ...MenuStyle.menu.sx,
      }}
    >
      <Heading variant="menu">Keyboard mapping :</Heading>
      <Grid mb={3} templateColumns="1fr 60px" rowGap={1}>
        {ingredients.map((ingredient) => (
          <Fragment key={ingredient}>
            <GridItem alignSelf="center">
              <Text>{translateIngredients(ingredient)}</Text>
            </GridItem>
            <GridItem>
              <Input
                variant="outline"
                textAlign="center"
                _focus={{
                  outline: 0,
                  boxShadow: 'none',
                  borderColor: 'orange.500',
                }}
                value={configuration.keyboardMap[ingredient]}
                onFocus={() => setSelectedIngredient(ingredient)}
                onChange={() => {
                  /* It's handled with the onfocus and keydown */
                }}
              />
            </GridItem>
          </Fragment>
        ))}
      </Grid>
      <Flex gap="40px">
        <Button
          variant="menu"
          flex={1}
          onClick={reset}
          leftIcon={
            resetPressed ? <AnimatedCheckMarkCircleIcon size="sm" /> : undefined
          }
        >
          Reset to default
        </Button>
        <Button variant="menu" flex={1} onClick={onBack}>
          Back
        </Button>
      </Flex>
      {!!selectedIngredient && (
        <KeyboardOverlay
          onAssign={assignKey}
          onCancel={() => setSelectedIngredient(null)}
        />
      )}
    </Box>
  );
};
