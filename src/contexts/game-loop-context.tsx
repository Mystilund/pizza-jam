import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  computeCartPrice,
  computeClientData,
  computeIngredientStock,
  computeMoneyData,
  computeSatisfactionEarn,
  floatRound,
} from '../utils/calculator';
import {
  initialGameSummary,
  SatisfactionClientNumberLinks,
} from '../utils/constants';
import {
  ClientType,
  Configuration,
  Ingredients,
  Scene,
  SummaryData,
} from '../utils/types';
import { useGame } from './game-context';

//-- Types
type GameLoopContextProvider = {
  finishGame: (
    usedIngredients: Record<Ingredients, number>,
    clientsResult: ClientType[]
  ) => void;
  clientEstimation: number;
  clientRange: [number, number];
  cart: Partial<Record<Ingredients, number>>;
  addToCart: (ingredient: Ingredients, qty?: number) => void;
  removeOneFromCart: (ingredient: Ingredients) => void;
  removeFromCart: (ingredient: Ingredients) => void;
  resetCart: VoidFunction;
  buyCart: VoidFunction;
  summaryData: SummaryData;
};

type GameLoopContextProps = {
  children: ReactNode;
};

//-- Context declaration

export const GameLoopContext = createContext<GameLoopContextProvider>({
  finishGame: () => {},
  clientEstimation: 0,
  clientRange: [0, 0],
  cart: {},
  addToCart: () => {},
  removeOneFromCart: () => {},
  removeFromCart: () => {},
  resetCart: () => {},
  buyCart: () => {},
  summaryData: initialGameSummary,
});

export const useGameLoop = (): GameLoopContextProvider =>
  useContext(GameLoopContext);

//-- Exposed Provider
export const GameLoopProvider = ({ children }: GameLoopContextProps) => {
  const { configuration, goToScene, setConfiguration } = useGame();
  const [gamesDone, setGamesDone] = useState(0);
  const [clientEstimation, setClientEstimation] = useState(0);
  const [clientRange, setClientRange] = useState<[number, number]>([0, 0]);
  const [cart, setCart] = useState<Partial<Record<Ingredients, number>>>({});
  const [summaryData, setSummaryData] =
    useState<SummaryData>(initialGameSummary);

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

  // Add one or multiple ingredients to the cart
  const addToCart = useCallback(
    (ingredient: Ingredients, qty = 1) => {
      const newCart = { ...cart, [ingredient]: (cart[ingredient] || 0) + qty };

      setCart(newCart);
    },
    [cart]
  );

  // Method to remove the key from the cart
  // Used when the number of ingredients comes to 0 or if the whole ingredient is deleted
  const removeFromCart = useCallback(
    (ingredient: Ingredients) => {
      const { [ingredient]: toRemove, ...rest } = cart;

      setCart(rest);
    },
    [cart]
  );

  // Method to remove on item from the cart
  const removeOneFromCart = useCallback(
    (ingredient: Ingredients) => {
      const newCart = { ...cart, [ingredient]: (cart[ingredient] || 0) - 1 };
      const countInCart = newCart[ingredient];

      if (typeof countInCart !== 'undefined' && countInCart <= 0) {
        removeFromCart(ingredient);
      } else {
        setCart(newCart);
      }
    },
    [cart, removeFromCart]
  );

  // Method to clean the cart
  const resetCart = useCallback(() => setCart({}), []);

  // Method to buy a cart
  const buyCart = useCallback(() => {
    const newConfig: Configuration = structuredClone(configuration);

    newConfig.game.money -= computeCartPrice(cart);
    (Object.entries(cart) as [Ingredients, number][]).forEach(
      ([ingredient, count]) => {
        newConfig.game.ingredients[ingredient] += count;
      }
    );
    setConfiguration(newConfig);
    setCart({});
  }, [cart, configuration, setConfiguration]);

  // The method to handle all the data coming from the game and redirecting to the summary page
  const finishGame = (
    usedIngredients: Record<Ingredients, number>,
    clientsResult: ClientType[]
  ) => {
    const newIngredientList = computeIngredientStock(
      configuration.game.ingredients,
      usedIngredients
    );

    const { totalClients, clientsSkipped, clientsError, clientsSuccess } =
      computeClientData(clientsResult);

    const satisfactionEarned = computeSatisfactionEarn(
      clientsSuccess,
      clientsError,
      clientsSkipped
    );

    const [moneyEarned, moneyPossibleTotal] = computeMoneyData(clientsResult);

    setGamesDone((g) => g + 1);
    setConfiguration({
      ...configuration,
      game: {
        ...configuration.game,
        ingredients: newIngredientList,
        money: floatRound(configuration.game.money + moneyEarned),
        satisfaction: floatRound(
          configuration.game.satisfaction + satisfactionEarned
        ),
      },
    });
    setSummaryData({
      totalClients,
      clientsSkipped,
      clientsError,
      clientsSuccess,
      satisfactionEarned,
      moneyEarned,
      moneyPossibleTotal,
    });
    goToScene(Scene.GAME_LOOP_SUMMARY);
  };

  const providerParameters = {
    finishGame,
    clientEstimation,
    clientRange,
    cart,
    addToCart,
    removeOneFromCart,
    removeFromCart,
    resetCart,
    buyCart,
    summaryData,
  };

  return (
    <GameLoopContext.Provider value={providerParameters}>
      {children}
    </GameLoopContext.Provider>
  );
};
