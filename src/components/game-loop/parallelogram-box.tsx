import { BoxProps, Flex, Text } from '@chakra-ui/react';
import { FunctionComponent, SVGProps } from 'react';

type ParallelogramBoxProps = {
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  iconColor: string;
  label: string;
} & BoxProps;

export const ParallelogramBox = ({
  Icon,
  iconColor,
  label,
  ...rest
}: ParallelogramBoxProps) => {
  return (
    <Flex
      alignItems="center"
      background="blackAlpha.700"
      color="white"
      gap={2}
      p="10px 20px"
      clipPath="polygon(8% 0%, 100% 0%, 92% 100%, 0 100%)"
      {...rest}
    >
      <Icon color={iconColor} />
      <Text>{label}</Text>
    </Flex>
  );
};
