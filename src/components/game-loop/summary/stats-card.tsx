import { chakra, ListItem, UnorderedList } from '@chakra-ui/react';
import { Trans, useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Infobox title={t('summary.statsTitle') as string} w="100%" minW="350px">
      <UnorderedList
        flex={1}
        flexDir="column"
        gap={2}
        justifyContent="space-evenly"
        pt="20px"
        pl="15px"
      >
        <ListItem>
          <Trans
            i18nKey="summary.totalClient"
            values={{ total: totalClients }}
            components={{
              bold: <chakra.strong color="orange.300" />,
            }}
          />
        </ListItem>
        <ListItem>
          <Trans
            i18nKey="summary.skippedClients"
            values={{ total: clientsSkipped }}
            components={{
              bold: <chakra.strong color="orange.300" />,
            }}
          />
        </ListItem>
        <ListItem>
          <Trans
            i18nKey="summary.missedPizza"
            values={{ total: clientsError }}
            components={{
              bold: <chakra.strong color="orange.300" />,
            }}
          />
        </ListItem>
        <ListItem>
          <Trans
            i18nKey="summary.successPizza"
            values={{ total: clientsSuccess }}
            components={{
              bold: <chakra.strong color="orange.300" />,
            }}
          />
        </ListItem>
      </UnorderedList>
    </Infobox>
  );
};
