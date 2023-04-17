import { ROUND_DURATION } from './constants';

export const pickNumberInRange = (range: [number, number]) => {
  return range[0] + Math.floor(Math.random() * (range[1] - range[0]));
};

export const calcTimePerPizzaFromRange = (
  range: [number, number]
): [number, number] => {
  const [min, max] = range;

  return [
    Math.round((ROUND_DURATION / min) * 100) / 100,
    Math.round((ROUND_DURATION / max) * 100) / 100,
  ];
};
