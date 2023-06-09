import { Grid, GridItem, Icon, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { floatRound } from '../../../utils/calculator';
import {
  SATISFACTION_EARN_PER_CLIENT,
  SATISFACTION_EARN_ROUND_FINISHED,
} from '../../../utils/constants';
import { Coin, Heart, User } from '../../icons/icons';
import { Infobox } from '../info-card';
import { Gauge } from './gauge';

type GaugeCardProps = {
  satisfactionEarned: number;
  clientsSuccess: number;
  totalClients: number;
  moneyEarned: number;
  moneyRatio: number;
  hasBonus: boolean;
};

export const GaugeCard = ({
  satisfactionEarned,
  clientsSuccess,
  totalClients,
  moneyEarned,
  moneyRatio,
  hasBonus,
}: GaugeCardProps) => {
  const { t } = useTranslation();
  const clientSatisfied = floatRound((clientsSuccess / totalClients) * 100);
  const satisfactionPercentage = floatRound(
    (satisfactionEarned /
      (totalClients * SATISFACTION_EARN_PER_CLIENT +
        SATISFACTION_EARN_ROUND_FINISHED)) *
      100
  );

  return (
    <Infobox justifyContent="center" w="100%" maxW="500px">
      <Grid w="100%" templateColumns="max-content 1fr" gap={2}>
        <Gauge
          label={t('summary.satisfaction', {
            value: displaySignedNumber(satisfactionEarned),
          })}
          icon={<Icon as={Heart} mr={2} verticalAlign="middle" />}
          labelColor="hotpink"
          colorScheme="pink"
          percentage={Math.max(satisfactionPercentage, 0)}
        />
        <Gauge
          label={t('summary.money', {
            value: moneyEarned,
          })}
          icon={<Icon as={Coin} mr={2} verticalAlign="middle" />}
          labelColor="gold"
          colorScheme="yellow"
          percentage={moneyRatio * 100}
        />
        <Gauge
          label={t('summary.success', {
            value: clientSatisfied,
          })}
          icon={<Icon as={User} mr={2} verticalAlign="middle" />}
          labelColor={
            clientSatisfied >= 80
              ? 'green.300'
              : clientSatisfied >= 40
              ? 'yellow.300'
              : 'red.500'
          }
          colorScheme={
            clientSatisfied >= 80
              ? 'whatsapp'
              : clientSatisfied >= 40
              ? 'yellow'
              : 'red'
          }
          percentage={clientSatisfied}
        />
        <GridItem colSpan={2} mt="20px">
          <Text textAlign="center" color="white" fontWeight="bold">
            {hasBonus ? t('summary.bonus') : t('summary.noBonus')}
          </Text>
        </GridItem>
      </Grid>
    </Infobox>
  );
};

function displaySignedNumber(num: number) {
  if (num < 0) {
    return num;
  }

  return '+' + num;
}
