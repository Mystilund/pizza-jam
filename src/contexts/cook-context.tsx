import { Box, Center, useBoolean } from '@chakra-ui/react';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { KeyboardSettingsView } from '../components/keyboard-settings-view';
import { SettingsView } from '../components/settings-view';
import {
  getHairColor,
  getShirtColor,
  getSkinColor,
  pickNumberInRange,
} from '../utils/calculator';
import {
  PAUSE_MUSIC_EVENT,
  PLAY_SOUND_EVENT,
  RESUME_MUSIC_EVENT,
} from '../utils/constants';
import {
  ArrayElement,
  AudioAssetUrl,
  GameData,
  Ingredients,
  Recipe,
  Scene,
  Skin,
} from '../utils/types';
import { useGame } from './game-context';
import { useGameLoop } from './game-loop-context';

//-- Types
type CookContextProvider = {
  startGame: VoidFunction;
  finishGame: VoidFunction;
  onSkipClient: VoidFunction;
  onUseIngredient: (ingredient: Ingredients) => void;
  onPizzaError: VoidFunction;
  onPizzaFinished: VoidFunction;
  pizzaSuccess: number;
  currentIndex: number;
  hasGameStarted: boolean;
  isGamePaused: boolean;
  isFinished: boolean;
  currentClient: ArrayElement<GameData['clients']> | undefined;
  clients: GameData['clients'];
  usedIngredients: GameData['usedIngredients'];
};

type CookContextProps = {
  children: ReactNode;
};

//-- Context declaration

export const CookContext = createContext<CookContextProvider>({
  startGame: () => {},
  finishGame: () => {},
  onSkipClient: () => {},
  onUseIngredient: () => {},
  onPizzaError: () => {},
  onPizzaFinished: () => {},
  pizzaSuccess: 0,
  currentIndex: 0,
  hasGameStarted: false,
  isGamePaused: false,
  isFinished: false,
  currentClient: undefined,
  clients: [],
  usedIngredients: {} as GameData['usedIngredients'],
});

export const useCook = (): CookContextProvider => useContext(CookContext);

//-- Exposed Provider
export const CookProvider = ({ children }: CookContextProps) => {
  const { configuration } = useGame();
  const { clientEstimation, finishGame: gameLoopFinishGame } = useGameLoop();
  const [hasGameStarted, setHasGameStarted] = useBoolean(false);
  const [isGamePaused, setIsGamePaused] = useBoolean(false);
  const [isFinished, setIsFinished] = useBoolean(false);
  const [pauseState, setPauseState] = useState(Scene.SETTINGS);
  const [usedIngredients, setUsedIngredients] = useState<
    GameData['usedIngredients']
  >(
    Object.fromEntries(Object.values(Ingredients).map((i) => [i, 0])) as Record<
      Ingredients,
      number
    >
  );
  const [clients, setClients] = useState<GameData['clients']>(() =>
    generateClientList(clientEstimation, configuration.game.recipes)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pizzaSuccess, setPizzaSuccess] = useState(0);

  // Catch when the option should open or close
  useEffect(() => {
    const optionMenu = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        e.stopPropagation();
        setIsGamePaused.toggle();
        setPauseState(Scene.SETTINGS);
      }
    };

    if (hasGameStarted) {
      window.addEventListener('keydown', optionMenu);
    }

    return () => {
      window.removeEventListener('keydown', optionMenu);
    };
  }, [hasGameStarted, setIsGamePaused]);

  // Pause the music when the game is paused
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(isGamePaused ? PAUSE_MUSIC_EVENT : RESUME_MUSIC_EVENT)
    );
  }, [isGamePaused]);

  // The method calls when the game end, sending data to the upper context
  // Game finish when :
  // - There are no client anymore
  // - The time is over
  //
  // If the game finish because of the time, the remaining clients are considered as skipped
  const finishGame = useCallback(() => {
    setIsFinished.on();
    const clientsListCopy = [...clients];

    for (let i = currentIndex; i < clientsListCopy.length; ++i) {
      clientsListCopy[i].skipped = true;
    }

    setCurrentIndex(clientsListCopy.length);
    setClients(clientsListCopy);

    setTimeout(() => {
      gameLoopFinishGame(usedIngredients, clientsListCopy);
    }, 5000);
  }, [
    clients,
    currentIndex,
    gameLoopFinishGame,
    setIsFinished,
    usedIngredients,
  ]);

  // When the player try to use a wrong ingredient
  // When the player reach 3 errors, the client leave the restaurant
  const onPizzaError = () => {
    const newClientData = [...clients];

    if (newClientData[currentIndex]) {
      ++newClientData[currentIndex].error;

      if (newClientData[currentIndex].error === 3) {
        setCurrentIndex((x) => x + 1);

        window.dispatchEvent(
          new CustomEvent<{ value: AudioAssetUrl }>(PLAY_SOUND_EVENT, {
            detail: { value: 'use-ingredient-sound.ogg' },
          })
        );

        if (currentIndex + 1 === clients.length) {
          // Can't use finishGame() because it won't have the right client (we set the data below)
          setIsFinished.on();
          setTimeout(() => {
            gameLoopFinishGame(usedIngredients, newClientData);
          }, 5000);
        }
      }

      setClients(newClientData);
    }
  };

  // When the pizza is finish, we go to the next client and we increase the number of finished pizza
  const onPizzaFinished = () => {
    setCurrentIndex((x) => x + 1);
    setPizzaSuccess((x) => x + 1);
    if (currentIndex + 1 === clients.length) {
      finishGame();
    }
  };

  // When the player skip a client
  const onSkipClient = () => {
    const newClientData = [...clients];

    if (newClientData[currentIndex]) {
      newClientData[currentIndex].skipped = true;

      setCurrentIndex((x) => x + 1);
      setClients(newClientData);
    }
    if (currentIndex + 1 === clients.length) {
      finishGame();
    }
  };

  // When the player uses an ingredient to make a pizza
  const onUseIngredient = (ingredient: Ingredients) => {
    const usedIngredientsCopy = structuredClone(usedIngredients);

    ++usedIngredientsCopy[ingredient];
    setUsedIngredients(usedIngredientsCopy);

    window.dispatchEvent(
      new CustomEvent<{ value: AudioAssetUrl }>(PLAY_SOUND_EVENT, {
        detail: { value: 'no-ingredient.wav' },
      })
    );
  };

  const providerParameters = {
    startGame: () => setHasGameStarted.on(),
    finishGame,
    onSkipClient,
    onUseIngredient,
    onPizzaError,
    onPizzaFinished,
    pizzaSuccess,
    currentIndex,
    hasGameStarted,
    isGamePaused,
    isFinished,
    currentClient: clients[currentIndex],
    clients,
    usedIngredients,
  };

  return (
    <CookContext.Provider value={providerParameters}>
      <Box position="relative" w="100%" h="100%">
        {isGamePaused && (
          <Center
            position="absolute"
            inset={0}
            zIndex={100}
            bg="blackAlpha.700"
          >
            {pauseState === Scene.SETTINGS ? (
              <SettingsView
                onBack={() => setIsGamePaused.off()}
                onKeyboardMenu={() => setPauseState(Scene.KEYBOARD_SETTINGS)}
              />
            ) : pauseState === Scene.KEYBOARD_SETTINGS ? (
              <KeyboardSettingsView
                onBack={() => setPauseState(Scene.SETTINGS)}
              />
            ) : null}
          </Center>
        )}
        <Box pointerEvents={isGamePaused ? 'none' : 'auto'} w="100%" h="100%">
          {children}
        </Box>
      </Box>
    </CookContext.Provider>
  );
};

// -----------------------------------------

function generateClientList(
  nb: number,
  recipeList: Recipe[]
): GameData['clients'] {
  return Array(nb)
    .fill(undefined)
    .map(() => generateClient(recipeList));
}

function generateClient(
  recipeList: Recipe[]
): ArrayElement<GameData['clients']> {
  const randomRecipe = recipeList[pickNumberInRange([0, recipeList.length])];
  const randomSkin =
    Object.values(Skin)[pickNumberInRange([0, Object.values(Skin).length])];

  return {
    skin: randomSkin,
    color: getShirtColor(),
    skinColor: getSkinColor(),
    hairColor: getHairColor(),
    error: 0,
    expectation: randomRecipe,
    skipped: false,
  };
}
