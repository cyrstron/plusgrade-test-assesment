import type { TaxBandResult, TaxTotalsResult } from '../../schemas/taxBrackets';
import type { TaxesStore } from './creator';

export const selectIncome = ({ income }: TaxesStore) => income;
export const selectTaxYear = ({ year }: TaxesStore) => year;
export const selectAllTaxBrackets = ({ brackets }: TaxesStore) => brackets;

export const selectTaxCalcError = ({ calcError }: TaxesStore) => calcError;
export const selectTaxCalcPending = ({ isCalcPending }: TaxesStore) =>
  isCalcPending;

export const selectTaxYearsError = ({ yearsError }: TaxesStore) => yearsError;
export const selectTaxYearsPending = ({ isYearsRequestPending }: TaxesStore) =>
  isYearsRequestPending;

export const selectTaxYearBrackets = (state: TaxesStore) => {
  const year = selectTaxYear(state);
  const brackets = selectAllTaxBrackets(state);

  return typeof year === 'number' ? brackets[year] : undefined;
};

export const selectTaxYears = ({ taxYears }: TaxesStore) => {
  return taxYears ?? [];
};

export const selectTaxYearsReady = (state: TaxesStore) =>
  !!selectTaxYears(state).length;

export const selectTaxResult = (state: TaxesStore) => {
  const activeBrackets = selectTaxYearBrackets(state);
  const income = selectIncome(state);

  if (typeof income !== 'number' || !activeBrackets) return [];

  return activeBrackets.reduce<TaxBandResult[]>(
    (result, { min, max, rate }) => {
      if (income >= min) {
        const taxed = Math.min(max ?? Number.POSITIVE_INFINITY, income) - min;

        result.push({
          max,
          min,
          rate,
          taxed,
          tax: taxed * rate,
        });
      }

      return result;
    },
    [],
  );
};

export const selectTaxTotals = (
  state: TaxesStore,
): TaxTotalsResult | undefined => {
  const taxes = selectTaxResult(state);
  const income = selectIncome(state);

  if (!taxes.length || typeof income === 'undefined') return undefined;

  const totalTax = taxes.reduce((total, { tax }) => total + tax, 0);

  return {
    min: 0,
    income,
    effectiveRate: income ? totalTax / income : 0,
    marginalRate: taxes[taxes.length - 1].rate,
    tax: totalTax,
  };
};
