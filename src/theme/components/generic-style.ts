import { FlexProps, SystemStyleObject } from '@chakra-ui/react';

export const MenuStyle: Record<string, FlexProps> = {
  menu: {
    color: 'gray.200',
    border: '5px solid',
    background: 'blackAlpha.900',
    sx: {
      borderImage:
        'repeating-linear-gradient( 45deg, var(--chakra-colors-orange-200), var(--chakra-colors-orange-200) 1%, var(--chakra-colors-orange-700) 1%, var(--chakra-colors-orange-700) 8%) 10',
    },
  },
};

export const ScrollbarStyle: SystemStyleObject = {
  '&::-webkit-scrollbar': {
    w: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    bg: 'tomato',
    borderRadius: '8px',
  },
};
