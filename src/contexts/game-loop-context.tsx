import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { SatisfactionClientNumberLinks } from '../utils/constants';
import { useGame } from './game-context';

//-- Types
type GameLoopContextProvider = {
  finishGame: VoidFunction;
  clientEstimation: number;
  clientRange: [number, number];
};

type GameLoopContextProps = {
  children: ReactNode;
};

//-- Context declaration

export const GameLoopContext = createContext<GameLoopContextProvider>({
  finishGame: () => {},
  clientEstimation: 0,
  clientRange: [0, 0],
});

export const useGameLoop = (): GameLoopContextProvider =>
  useContext(GameLoopContext);

//-- Exposed Provider
export const GameLoopProvider = ({ children }: GameLoopContextProps) => {
  const { configuration } = useGame();
  const [gamesDone, setGamesDone] = useState(0);
  const [clientEstimation, setClientEstimation] = useState(0);
  const [clientRange, setClientRange] = useState<[number, number]>([0, 0]);

  const finishGame = () => {
    setGamesDone((g) => g + 1);
  };

  // Calculate how many clients there will be
  useEffect(() => {
    let clientRange = SatisfactionClientNumberLinks[0][1];
    const link = SatisfactionClientNumberLinks.find(([satisfactionLink]) => {
      return (
        satisfactionLink[0] <= configuration.game.satisfaction &&
        configuration.game.satisfaction < satisfactionLink[1]
      );
    });

    if (link) {
      clientRange = link[1];
    }

    setClientRange(clientRange);
    setClientEstimation(
      clientRange[0] +
        Math.floor(Math.random() * (clientRange[1] - clientRange[0]))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamesDone]);

  const providerParameters = {
    finishGame,
    clientEstimation,
    clientRange,
  };

  return (
    <GameLoopContext.Provider value={providerParameters}>
      {children}
    </GameLoopContext.Provider>
  );
};
