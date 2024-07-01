import { Box, Spinner } from '@radix-ui/themes';
import { create } from '@stylexjs/stylex';
import type { FC } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Notification } from '../../components/Notification';
import { Table } from '../../components/Table';
import { Totals } from '../../components/Totals';
import type { TaxBandResult } from '../../schemas/taxBrackets';
import {
  selectTaxCalcError,
  selectTaxCalcPending,
  selectTaxResult,
  selectTaxTotals,
  selectTaxYear,
} from '../../state/taxes/selectors';
import { useTaxesStore } from '../../state/taxes/store';
import { sx } from '../../styles/sx';
import { columnDefs } from './columnDefs';

export interface CalcTableProps {
  className?: string;
}

export const CalcTable: FC<CalcTableProps> = ({ className }) => {
  const isPending = useTaxesStore(selectTaxCalcPending);
  const error = useTaxesStore(selectTaxCalcError);
  const taxes = useTaxesStore(selectTaxResult);
  const totals = useTaxesStore(selectTaxTotals);
  const taxYear = useTaxesStore(selectTaxYear);
  const fetchTaxBrackets = useTaxesStore((state) => state.fetchTaxBrackets);

  return (
    <Box {...sx(root, className)}>
      {isPending && <Spinner size="3" />}
      {error && (
        <ErrorMessage {...sx(notification)} onRetry={fetchTaxBrackets}>
          {error.message}
        </ErrorMessage>
      )}
      {!taxYear && !error && (
        <Notification {...sx(notification)}>
          Choose a tax year and provide your income
        </Notification>
      )}
      {!!taxes.length && (
        <Table<TaxBandResult>
          columnDefs={columnDefs}
          data={taxes.map((row) => ({ ...row, key: `${row.min}` }))}
          {...sx(table)}
        />
      )}
      {totals && <Totals {...totals} />}
    </Box>
  );
};

const { root, notification, table } = create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification: {
    width: '100%',
  },
  table: {
    flexGrow: 1,
    width: '100%',
  },
});
