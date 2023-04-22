import { BoxProps, chakra, Icon, IconProps } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FunctionComponent, SVGProps } from 'react';

import { ClientType, Ingredients, Skin } from '../../utils/types';
import { ReactComponent as Beef } from './Beef.svg';
import { ReactComponent as BlueCheese } from './BlueCheese.svg';
import { ReactComponent as CheckMarkCircleIcon } from './CheckMarkCircle.svg';
import { ReactComponent as Cheese } from './Cheese.svg';
import { ReactComponent as Chicken } from './Chicken.svg';
import { ReactComponent as Cream } from './Cream.svg';
import { ReactComponent as Dough } from './Dough.svg';
import { ReactComponent as GoatCheese } from './GoatCheese.svg';
import { ReactComponent as Ham } from './Ham.svg';
import { ReactComponent as Herb } from './Herb.svg';
import { ReactComponent as Honey } from './Honey.svg';
import { ReactComponent as Man } from './Man.svg';
import { ReactComponent as Mushroom } from './Mushroom.svg';
import { ReactComponent as Olives } from './Olives.svg';
import { ReactComponent as Onion } from './Onion.svg';
import { ReactComponent as Pepper } from './Pepper.svg';
import { ReactComponent as Pepperoni } from './Pepperoni.svg';
import { ReactComponent as Pineapple } from './Pineapple.svg';
import { ReactComponent as Potato } from './Potato.svg';
import { ReactComponent as Salmon } from './Salmon.svg';
import { ReactComponent as Tomato } from './Tomato.svg';
import { ReactComponent as Tuna } from './Tuna.svg';
import { ReactComponent as Woman } from './Woman.svg';

export { ReactComponent as Beef } from './Beef.svg';
export { ReactComponent as BlueCheese } from './BlueCheese.svg';
export { ReactComponent as Can } from './Can.svg';
export { ReactComponent as CheckMarkCircleIcon } from './CheckMarkCircle.svg';
export { ReactComponent as Cheese } from './Cheese.svg';
export { ReactComponent as Chicken } from './Chicken.svg';
export { ReactComponent as Coin } from './Coin.svg';
export { ReactComponent as Cream } from './Cream.svg';
export { ReactComponent as Dough } from './Dough.svg';
export { ReactComponent as GoatCheese } from './GoatCheese.svg';
export { ReactComponent as GraphicEqIcon } from './GraphicEq.svg';
export { ReactComponent as Ham } from './Ham.svg';
export { ReactComponent as Heart } from './Heart.svg';
export { ReactComponent as Herb } from './Herb.svg';
export { ReactComponent as Honey } from './Honey.svg';
export { ReactComponent as Mushroom } from './Mushroom.svg';
export { ReactComponent as Olives } from './Olives.svg';
export { ReactComponent as Onion } from './Onion.svg';
export { ReactComponent as Pepper } from './Pepper.svg';
export { ReactComponent as Pepperoni } from './Pepperoni.svg';
export { ReactComponent as Pineapple } from './Pineapple.svg';
export { ReactComponent as Potato } from './Potato.svg';
export { ReactComponent as Salmon } from './Salmon.svg';
export { ReactComponent as Tomato } from './Tomato.svg';
export { ReactComponent as Tuna } from './Tuna.svg';
export { ReactComponent as User } from './User.svg';

const styledCheckMarkCircle = styled(CheckMarkCircleIcon)`
  .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #7ac142;
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }

  .checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes scale {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }
  @keyframes fill {
    100% {
      box-shadow: inset 0px 0px 0px 30px #7ac142;
    }
  }
`;

export const AnimatedCheckMarkCircleIcon = (
  props: BoxProps & { size: 'sm' | 'md' | 'lg' }
) => {
  const ChakraIcon = chakra(styledCheckMarkCircle);

  const hAndW =
    props.size === 'sm' ? '18px' : props.size === 'md' ? '32px' : '56px';

  return (
    <ChakraIcon
      borderRadius="50%"
      display="block"
      strokeWidth={2}
      stroke="#fff"
      strokeMiterlimit={10}
      margin="10% auto"
      boxShadow="inset 0px 0px 0px #7ac142;"
      animation="fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both"
      w={hAndW}
      h={hAndW}
      {...props}
    />
  );
};

type ClientIconType = IconProps &
  Pick<ClientType, 'skin' | 'color' | 'skinColor' | 'hairColor'>;

export const Client = ({
  skin,
  color,
  skinColor,
  hairColor,
  ...rest
}: ClientIconType) => {
  const SkinIcon = skin === Skin.MALE1 ? Man : Woman;

  return (
    <Icon
      as={SkinIcon}
      sx={{
        '& .skin': {
          fill: skinColor,
        },
        '& .hair': {
          fill: hairColor,
        },
        '& .shirt': {
          fill: color,
        },
      }}
      {...rest}
    />
  );
};

export const IngredientIconMap: Record<
  Ingredients,
  FunctionComponent<SVGProps<SVGSVGElement>>
> = {
  [Ingredients.DOUGH]: Dough,
  [Ingredients.TOMATO_SAUCE]: Tomato,
  [Ingredients.CREAM_SAUCE]: Cream,
  [Ingredients.HAM]: Ham,
  [Ingredients.PEPPERONI]: Pepperoni,
  [Ingredients.CHICKEN]: Chicken,
  [Ingredients.BEEF]: Beef,
  [Ingredients.SALMON]: Salmon,
  [Ingredients.TUNA]: Tuna,
  [Ingredients.CHEESE]: Cheese,
  [Ingredients.GOAT_CHEESE]: GoatCheese,
  [Ingredients.BLUE_CHEESE]: BlueCheese,
  [Ingredients.MUSHROOMS]: Mushroom,
  [Ingredients.PEPPERS]: Pepper,
  [Ingredients.POTATOS]: Potato,
  [Ingredients.OLIVES]: Olives,
  [Ingredients.HERBS]: Herb,
  [Ingredients.ONIONS]: Onion,
  [Ingredients.HONEY]: Honey,
  [Ingredients.PINEAPPLE]: Pineapple,
};
