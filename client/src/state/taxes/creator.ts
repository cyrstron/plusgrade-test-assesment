import type { StateCreator } from 'zustand';
import { fetchTaxBrackets, fetchTaxYears } from '../../api/taxBrackets';
import type { TaxBand } from '../../schemas/taxBrackets';

export type TaxesStore = {
  year?: number;
  income?: number;

  brackets: Record<number, TaxBand[] | undefined>;
  isCalcPending: boolean;
  calcError?: Error;

  taxYears?: number[];
  isYearsRequestPending: boolean;
  yearsError?: Error;

  submitTaxYear: (options: {
    year: number;
    income: number;
  }) => Promise<void>;
  fetchTaxBrackets: () => Promise<void>;
  fetchTaxYears(): Promise<void>;
  reset(): void;
};

export const createTaxesStore: StateCreator<TaxesStore> = (set, get) => ({
  brackets: {},
  isCalcPending: false,
  isYearsRequestPending: false,
  fetchTaxYears: async () => {
    const { taxYears, isYearsRequestPending } = get();

    if (taxYears || isYearsRequestPending) return;

    set({ isYearsRequestPending: true, yearsError: undefined });

    try {
      const { tax_years: taxYears } = await fetchTaxYears();

      set({ taxYears: taxYears });
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Something went wrong...');

      set({ yearsError: error });
    } finally {
      set({ isYearsRequestPending: false });
    }
  },
  submitTaxYear: async ({ year, income }: { year: number; income: number }) => {
    const { fetchTaxBrackets, isCalcPending } = get();

    if (isCalcPending) return;

    set({ year, income });

    fetchTaxBrackets();
  },
  fetchTaxBrackets: async () => {
    const { brackets, year } = get();

    if (!year || brackets[year]) return;

    set({ isCalcPending: true, calcError: undefined });

    try {
      const taxBrackets = await fetchTaxBrackets(year);

      set({ brackets: { ...brackets, [year]: taxBrackets.tax_brackets } });
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('Something went wrong...');

      set({ calcError: error });
    } finally {
      set({ isCalcPending: false });
    }
  },
  reset: () => {
    set({
      brackets: {},
      isCalcPending: false,
      isYearsRequestPending: false,
      year: undefined,
      income: undefined,
      calcError: undefined,
      taxYears: undefined,
      yearsError: undefined,
    });
  },
});
