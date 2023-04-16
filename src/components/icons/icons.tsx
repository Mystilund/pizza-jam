import { BoxProps, chakra } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { ReactComponent as CheckMarkCircleIcon } from './CheckMarkCircle.svg';

export { ReactComponent as CheckMarkCircleIcon } from './CheckMarkCircle.svg';
export { ReactComponent as GraphicEqIcon } from './GraphicEq.svg';

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
