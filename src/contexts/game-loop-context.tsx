import { createContext, ReactNode, useContext } from 'react';

//-- Types
type GameLoopContextProvider = {};

type GameLoopContextProps = {
  children: ReactNode;
};

//-- Context declaration

export const GameLoopContext = createContext<GameLoopContextProvider>({});

export const useGameLoop = (): GameLoopContextProvider =>
  useContext(GameLoopContext);

//-- Exposed Provider
export const GameLoopProvider = ({ children }: GameLoopContextProps) => {
  const providerParameters = {};

  return (
    <GameLoopContext.Provider value={providerParameters}>
      {children}
    </GameLoopContext.Provider>
  );
};
