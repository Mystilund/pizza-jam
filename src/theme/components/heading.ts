import { ComponentStyleConfig } from '@chakra-ui/react';

export const Heading: ComponentStyleConfig = {
  variants: {
    menu: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      mb: 4,
    },
    cursive: {
      fontWeight: 'normal',
      fontFamily: '"Pacifico", cursive',
    },
    cursiveMenu: {
      fontSize: '1.5em',
      fontWeight: 'normal',
      fontFamily: '"Pacifico", cursive',
      mb: 4,
    },
  },
  defaultProps: {},
};
