import { BoxProps, Divider, Flex, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { CDN_URL } from '../../utils/constants';

type InfoboxProps = BoxProps & {
  children: ReactNode;
  title?: string;
};

export const Infobox = ({ children, title, ...rest }: InfoboxProps) => (
  <Flex
    flexDir="column"
    h="200px"
    w="30%"
    p="10px"
    border="1px solid"
    borderRadius={10}
    borderColor="gray.700"
    background={`url("${CDN_URL}/images/pizza-recipe-bg.jpg")`}
    backgroundSize="cover"
    color="gray.200"
    {...rest}
  >
    {title && (
      <>
        <Heading variant="cursiveMenu" textAlign="center">
          {title}
        </Heading>
        <Divider borderColor="gray.200" />
      </>
    )}
    {children}
  </Flex>
);
