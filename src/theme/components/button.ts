import { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  variants: {
    menu: {
      bg: 'orange.100',
      color: 'gray.900',
      _hover: {
        bg: 'orange.300',
      },
      _focus: {
        border: '2px solid',
        borderColor: 'orange.500',
        outline: 0,
        boxShadow: 'none',
      },
      _active: {
        bg: 'orange.500',
      },
    },
  },
  defaultProps: {},
};
