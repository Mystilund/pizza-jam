import {
  ingredientPrices,
  pizzaPrices,
  ROUND_DURATION,
  SATISFACTION_EARN_PER_CLIENT,
  SATISFACTION_EARN_ROUND_FINISHED,
  SATISFACTION_LOST_PER_CLIENT,
} from './constants';
import { ClientType, Ingredients } from './types';

const canColors = [
  '#F7A4A4',
  '#FFD4B2',
  '#FFF6BD',
  '#CEEDC7',
  '#86C8BC',
  '#9EA1D4',
];
const shirtColors = [
  '#ffadad',
  '#ffd6a5',
  '#fdffb6',
  '#caffbf',
  '#9bf6ff',
  '#a0c4ff',
  '#bdb2ff',
  '#ffc6ff',
];
const hairColors = [
  '#7d512c',
  '#fbd076',
  '#fad2e1',
  '#aed0ff',
  '#dd7f5a',
  '#f79d65',
  '#f4efe6',
  '#bbefa9',
];
const skinColor = ['#fbf1ea', '#f3d6c2', '#e5cdb0', '#d4a373'];

// Pick a random number in a given range
export const pickNumberInRange = (range: [number, number]) => {
  return range[0] + Math.floor(Math.random() * (range[1] - range[0]));
};

// Based on the number of clients expected
// give an approximate of the time per pizza to finish the round
export const calcTimePerPizzaFromRange = (
  range: [number, number]
): [number, number] => {
  const [min, max] = range;

  return [
    Math.round((ROUND_DURATION / min) * 100) / 100,
    Math.round((ROUND_DURATION / max) * 100) / 100,
  ];
};

// Compute the color of an ingredient based on its name
// So we have a random color but it doesn't change
export const getIngredientColor = () => {
  return Object.fromEntries(
    Object.values(Ingredients).map((ingredient) => {
      const colorIndex = ingredient.split('').reduce((acc, letter) => {
        return acc + letter.charCodeAt(0);
      }, 0);

      return [ingredient, canColors[colorIndex % canColors.length]];
    })
  );
};

// Pick a random shirt color in the defined array on top of the file
export const getShirtColor = () => {
  return shirtColors[pickNumberInRange([0, shirtColors.length])];
};

// Pick a random skin color in the defined array on top of the file
export const getSkinColor = () => {
  return skinColor[pickNumberInRange([0, skinColor.length])];
};

// Pick a random hair color in the defined array on top of the file
export const getHairColor = () => {
  return hairColors[pickNumberInRange([0, hairColors.length])];
};

// Calculate the total price of the given cart
export const computeCartPrice = (
  cart: Partial<Record<Ingredients, number>>
) => {
  return (Object.entries(cart) as Array<[Ingredients, number]>).reduce(
    (total, [ingredient, count]) => {
      return total + count * ingredientPrices[ingredient];
    },
    0
  );
};

// Calculate how many ingredients remains after using some during the game
export const computeIngredientStock = (
  currentStock: Record<Ingredients, number>,
  usedIngredients: Record<Ingredients, number>
) => {
  return Object.fromEntries(
    Object.values(Ingredients).map((ingredient) => [
      ingredient,
      currentStock[ingredient] - usedIngredients[ingredient],
    ])
  ) as Record<Ingredients, number>;
};

// Calculate some data based on the client
export const computeClientData = (clients: ClientType[]) => {
  const clientsSkipped = clients.filter(({ skipped }) => skipped).length;
  const clientsError = clients.filter(({ error }) => error === 3).length;

  return {
    totalClients: clients.length,
    clientsSkipped,
    clientsError,
    clientsSuccess: clients.length - (clientsSkipped + clientsError),
  };
};

// Calculate the satisfaction earn (or lost) based on client success/errors/skipped
export const computeSatisfactionEarn = (
  clientsSuccess: number,
  clientsError: number,
  clientsSkipped: number
) => {
  const hasBonus = !(clientsError + clientsSkipped);

  return (
    clientsSuccess * SATISFACTION_EARN_PER_CLIENT +
    (hasBonus ? SATISFACTION_EARN_ROUND_FINISHED : 0) +
    (clientsError + clientsSkipped) * SATISFACTION_LOST_PER_CLIENT
  );
};

// Calculate the money earn and how many it was possible to earn
export const computeMoneyData = (clients: ClientType[]) => {
  const reducer = (acc: number, value: ClientType) => {
    return acc + pizzaPrices[value.expectation];
  };

  return [
    clients
      .filter((client) => {
        return !client.skipped && client.error < 3;
      })
      .reduce(reducer, 0),
    clients.reduce(reducer, 0),
  ];
};
