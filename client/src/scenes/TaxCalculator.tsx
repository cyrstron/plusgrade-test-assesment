import { Card, Flex, Separator, Spinner } from '@radix-ui/themes';
import { create } from '@stylexjs/stylex';
import { type FC, useEffect } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { CalcTable } from '../features/CalcTable/CalcTable';
import { IncomeForm } from '../features/IncomeForm';
import { useTaxesStore } from '../state/taxes';
import {
  selectTaxYearsError,
  selectTaxYearsPending,
  selectTaxYearsReady,
} from '../state/taxes/selectors';
import { sx } from '../styles/sx';

export interface TaxCalculatorProps {
  className?: string;
}

export const ERROR_TEST_ID = 'calc-init-error';
export const TAX_CALC_ID = 'tax-calc-container';

export const TaxCalculator: FC<TaxCalculatorProps> = ({ className }) => {
  const error = useTaxesStore(selectTaxYearsError);
  const isPending = useTaxesStore(selectTaxYearsPending);
  const isReady = useTaxesStore(selectTaxYearsReady);
  const fetchYears = useTaxesStore((state) => state.fetchTaxYears);

  useEffect(() => {
    fetchYears();
  }, [fetchYears]);

  return (
    <Card {...sx(root, className)}>
      {isPending && <Spinner size="3" />}
      {error && (
        <ErrorMessage
          testId={ERROR_TEST_ID}
          {...sx(errorMessage)}
          onRetry={fetchYears}
        >
          {error.message}
        </ErrorMessage>
      )}
      {isReady && (
        <Flex
          direction="column"
          gap="2"
          align="stretch"
          data-testid={TAX_CALC_ID}
          {...sx(calculator)}
        >
          <IncomeForm />
          <Separator size="4" />
          <CalcTable {...sx(table)} />
        </Flex>
      )}
    </Card>
  );
};

const { root, errorMessage, calculator, table } = create({
  root: {
    minHeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  errorMessage: {
    width: '100%',
    maxWidth: 400,
  },
  calculator: {
    width: '100%',
    alignSelf: 'stretch',
    height: '100%',
    flexGrow: 1,
  },
  table: {
    flexGrow: 1,
  },
});
