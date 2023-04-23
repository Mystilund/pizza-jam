import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect } from 'react';

import { useGame } from '../../../../contexts/game-context';
import { useGameLoop } from '../../../../contexts/game-loop-context';
import { PreparationView } from '../../../../scenes/game-loop/preparation';
import { CDN_URL } from '../../../../utils/constants';
import { Scene } from '../../../../utils/types';
import { Coin, Heart } from '../../../icons/icons';
import { ParallelogramBox } from '../../parallelogram-box';
import { ExpectationCard } from '../expectation-card';
import { HelpCard } from '../help-card';

type PreparationMainViewProps = {
  onChangeView: (view: PreparationView) => void;
};

const GlowyButton = styled(Button)`
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;

  &:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left:-2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
  }

  &:active {
    color: #000
  }

  &:active:after {
    background: transparent;
  }

  &:hover:before {
    opacity: 1;
  }

  &:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  @keyframes glowing {
      0% { background-position: 0 0; }
      50% { background-position: 400% 0; }
      100% { background-position: 0 0; }
`;

export const PreparationMainView = ({
  onChangeView,
}: PreparationMainViewProps) => {
  const { configuration, goToScene } = useGame();
  const { resetCart } = useGameLoop();

  useEffect(() => resetCart(), [resetCart]);

  const goToGame = () => {
    goToScene(Scene.GAME_LOOP_COOK);
  };

  return (
    <Flex
      flexDir="column"
      h="100%"
      w="100%"
      p="20px"
      bg={`url("${CDN_URL}/images/bg-cook.jpg")`}
      backgroundSize="cover"
    >
      <Flex gap={2} alignItems="center">
        <Button
          border="2px solid"
          borderColor="teal.800"
          colorScheme="teal"
          onClick={() => goToScene(Scene.MAIN_MENU)}
        >
          Back to menu
        </Button>
        <Button
          border="2px solid"
          borderColor="orange.800"
          colorScheme="orange"
          onClick={() => onChangeView(PreparationView.RECIPES_VIEW)}
        >
          Recipes
        </Button>
        <Button
          border="2px solid"
          borderColor="orange.800"
          colorScheme="orange"
          onClick={() => onChangeView(PreparationView.INGREDIENTS_VIEW)}
        >
          Ingredients
        </Button>
        <ParallelogramBox
          ml="auto"
          Icon={Heart}
          iconColor="hotpink"
          label={`Satisfaction : ${configuration.game.satisfaction}`}
        />
        <ParallelogramBox
          Icon={Coin}
          iconColor="gold"
          label={`Money : ${configuration.game.money}`}
        />
      </Flex>
      <Spacer />
      <Flex justifyContent="space-evenly" gap="20px" flexDir="column">
        <ExpectationCard />
        <HelpCard />
      </Flex>
      <Spacer />
      <Box textAlign="center">
        <GlowyButton onClick={goToGame}>Start a new day of work</GlowyButton>
      </Box>
    </Flex>
  );
};
