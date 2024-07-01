import { z } from 'zod';

export const TaxBand = z
  .object({
    min: z.number().nonnegative(),
    max: z.number().nonnegative().nullish(),
    rate: z.number().nonnegative().max(1),
  })
  .refine(
    (data) => !data.max || data.max > data.min,
    'Max band threshold should be bigger than min!',
  );

export type TaxBand = z.infer<typeof TaxBand>;

export const TaxYears = z.object({
  tax_years: z.array(z.number().positive()),
});

export type TaxYears = z.infer<typeof TaxYears>;

export const TaxBrackets = z.object({
  tax_brackets: z.array(TaxBand),
});

export type TaxBrackets = z.infer<typeof TaxBrackets>;

export type TaxBandResult = {
  tax: number;
  taxed: number;
} & TaxBand;

export type TaxTotalsResult = {
  min: number;
  income: number;
  effectiveRate: number;
  marginalRate: number;
  tax: number;
};
