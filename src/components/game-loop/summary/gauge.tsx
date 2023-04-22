import { Box, GridItem, Progress, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type GaugeProps = {
  label: string;
  labelColor: string;
  icon: ReactNode;
  colorScheme: string;
  percentage: number;
};

export const Gauge = ({
  label,
  labelColor,
  icon,
  colorScheme,
  percentage,
}: GaugeProps) => {
  return (
    <>
      <GridItem>
        <Box color={labelColor}>
          {icon}
          <Text as="span">{label}</Text>
        </Box>
      </GridItem>
      <GridItem display="flex" alignItems="center">
        <Progress
          flex={1}
          size="xs"
          value={percentage}
          colorScheme={colorScheme}
          sx={{
            '[role=progressbar]': {
              transition: 'width 1s ease',
            },
          }}
        />
      </GridItem>
    </>
  );
};
