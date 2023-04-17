import { Divider, Flex, Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { CDN_URL } from '../../utils/constants';

export const Infobox = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => (
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
  >
    <Heading variant="menu" textAlign="center" fontFamily="cursive">
      {title}
    </Heading>
    <Divider borderColor="gray.200" />
    {children}
  </Flex>
);
