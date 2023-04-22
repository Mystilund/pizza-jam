import { Box } from '@chakra-ui/react';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useLocalStorage } from 'react-use';

import { defaultConfiguration } from '../utils/constants';
import { Configuration, Scene } from '../utils/types';

//-- Types
type GameContextProvider = {
  activeScene: Scene;
  backScene: () => void;
  goToScene: (target: Scene, addToSceneOrder?: boolean) => void;
  configuration: Configuration;
  setConfiguration: (config: Configuration) => void;
};

type GameContextProps = {
  children: ReactNode;
};

//-- Context declaration

export const GameContext = createContext<GameContextProvider>({
  activeScene: Scene.MAIN_MENU,
  backScene: () => {},
  goToScene: () => {},
  configuration: {} as Configuration,
  setConfiguration: () => {},
});

export const useGame = (): GameContextProvider => useContext(GameContext);

//-- Exposed Provider
export const GameProvider = ({ children }: GameContextProps) => {
  const [configuration, setConfiguration] = useLocalStorage<Configuration>(
    'GAME_CONFIGURATION',
    defaultConfiguration
  );
  const [activeScene, setActiveScene] = useState<Scene>(Scene.MAIN_MENU);
  const [sceneOrder, setSceneOrder] = useState([Scene.MAIN_MENU]);
  const [[w, h, mt]] = useState(() => {
    const maxW = Math.max(window.innerWidth, 1000);
    const maxH = Math.max(window.innerHeight, 563);

    const h = (maxW * 9) / 16;
    const w = (maxH * 16) / 9;

    // @todo: maybe set error if to low resolution ?

    if (h < maxH) {
      // ratio based on the width
      return [maxW, h, (maxH - h) / 2];
    } else {
      // ratio based on the height
      return [w, maxH, 0];
    }
  });

  const goToScene = (target: Scene, addToSceneOrder = true) => {
    setActiveScene(target);
    if (addToSceneOrder) {
      setSceneOrder([...sceneOrder, target]);
    }
  };
  const backScene = () => {
    const newSceneOrder = [...sceneOrder];
    newSceneOrder.pop();

    const lastScene = newSceneOrder[newSceneOrder.length - 1];

    setSceneOrder(newSceneOrder);
    // we don't add it to the list since the scene order is already up to date
    goToScene(lastScene, false);
  };

  const providerParameters = {
    activeScene,
    backScene,
    goToScene,
    configuration: configuration as Configuration,
    setConfiguration,
  };

  return (
    <GameContext.Provider value={providerParameters}>
      <Box
        id="game-container"
        bg="black"
        w={`${w}px`}
        h={`${h}px`}
        mt={`${mt}px`}
        mx="auto"
        overflow="hidden"
      >
        {children}
      </Box>
    </GameContext.Provider>
  );
};
