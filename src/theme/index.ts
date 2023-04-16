import { extendTheme, theme as chakraTheme } from '@chakra-ui/react';

import * as componentsTheme from './components';

export const theme = extendTheme({
  ...chakraTheme,
  components: {
    ...chakraTheme.components,
    ...componentsTheme,
  },
});
