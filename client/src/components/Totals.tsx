import { Box, Flex, Text } from '@radix-ui/themes';
import { create } from '@stylexjs/stylex';
import type { FC } from 'react';
import { formatCurrency, formatPercents } from '../helpers/formatters';
import type { TaxTotalsResult } from '../schemas/taxBrackets';
import { sx } from '../styles/sx';

export type TotalsProps = TaxTotalsResult & {
  className?: string;
};

export const Totals: FC<TotalsProps> = ({
  className,
  effectiveRate,
  marginalRate,
  tax,
  income,
}) => {
  return (
    <Flex className={className} gap="2" width="100%">
      <Box {...sx(column)}>
        <Text as="span" {...sx(label)}>
          Net:
        </Text>{' '}
        {formatCurrency(income - tax)}
        <br />
        <Text as="span" {...sx(label)}>
          Total tax:
        </Text>{' '}
        {formatCurrency(tax)}
      </Box>
      <Box {...sx(column)}>
        <Text as="span" {...sx(label)}>
          Effective rate:
        </Text>{' '}
        {formatPercents(effectiveRate)}
        <br />
        <Text as="span" {...sx(label)}>
          Marginal rate:
        </Text>{' '}
        {formatPercents(marginalRate)}
      </Box>
    </Flex>
  );
};

const { label, column } = create({
  label: {
    fontWeight: 'bold',
  },
  column: {
    flexGrow: 1,
  },
});
