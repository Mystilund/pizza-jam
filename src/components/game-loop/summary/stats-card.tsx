import { chakra, ListItem, UnorderedList } from '@chakra-ui/react';

import { Infobox } from '../info-card';

type StatsCardProps = {
  totalClients: number;
  clientsSkipped: number;
  clientsError: number;
  clientsSuccess: number;
};

export const StatsCard = ({
  totalClients,
  clientsSkipped,
  clientsError,
  clientsSuccess,
}: StatsCardProps) => {
  return (
    <Infobox title="Statistics">
      <UnorderedList
        flex={1}
        flexDir="column"
        gap={2}
        justifyContent="space-evenly"
        pt="20px"
        pl="15px"
      >
        <ListItem>
          Total clients :{' '}
          <chakra.strong color="orange.300">{totalClients}</chakra.strong>
        </ListItem>
        <ListItem>
          Number of skipped client :{' '}
          <chakra.strong color="orange.300">{clientsSkipped}</chakra.strong>
        </ListItem>
        <ListItem>
          Number of missed pizza :{' '}
          <chakra.strong color="orange.300">{clientsError}</chakra.strong>
        </ListItem>
        <ListItem>
          Number of successful pizzas :{' '}
          <chakra.strong color="orange.300">{clientsSuccess}</chakra.strong>
        </ListItem>
      </UnorderedList>
    </Infobox>
  );
};
