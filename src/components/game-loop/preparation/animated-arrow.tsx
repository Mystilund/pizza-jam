import { Box, BoxProps, Flex } from '@chakra-ui/react';

type AnimatedArrowProps = {
  total: number;
} & BoxProps;

export const AnimatedArrow = ({ total, ...rest }: AnimatedArrowProps) => {
  return (
    <Flex
      animation="0.8s linear 0s infinite alternate none running slidein"
      gap={1}
    >
      {Array(total)
        .fill(undefined)
        .map((v, index) => (
          <Box
            key={index}
            w={0}
            h={0}
            borderTop="9px solid transparent"
            borderBottom="9px solid transparent"
            borderRight="15px solid black"
            {...rest}
          />
        ))}
    </Flex>
  );
};
