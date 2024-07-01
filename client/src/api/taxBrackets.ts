import axios from 'axios';
import { ZodError } from 'zod';
import { TaxBrackets, TaxYears } from '../schemas/taxBrackets';

export async function fetchTaxBrackets(year: number): Promise<TaxBrackets> {
  const { data } = await axios.get(`/tax-calculator/tax-year/${year}`);

  try {
    const taxBrackets = await TaxBrackets.parseAsync(data);

    return taxBrackets;
  } catch (err) {
    throw err instanceof ZodError
      ? Error('Tax brackets response is invalid')
      : err;
  }
}

export async function fetchTaxYears(): Promise<TaxYears> {
  const { data } = await axios.get('/tax-calculator/tax-year');

  try {
    const taxYears = await TaxYears.parseAsync(data);

    return taxYears;
  } catch (err) {
    throw err instanceof ZodError
      ? Error('Tax years response is invalid')
      : err;
  }
}
