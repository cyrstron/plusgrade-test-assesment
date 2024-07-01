import { Theme } from '@radix-ui/themes';
import { render } from '@testing-library/react';
import type { Mock } from 'vitest';
import { fetchTaxYears } from '../../api/taxBrackets';
import { useTaxesStore } from '../../state/taxes';
import { TAX_CALC_ID, TaxCalculator } from '../TaxCalculator';

vitest.mock('../../api/taxBrackets');

const years = [2020, 2021, 2022];

describe('TaxCalclator', () => {
  beforeEach(() => {
    (fetchTaxYears as Mock).mockResolvedValue({ tax_years: years });
    useTaxesStore.getState().reset();
  });

  it('should show tax calculator container when tax years are fetched', async () => {
    const { findByTestId } = render(
      <Theme>
        <TaxCalculator />
      </Theme>,
    );

    const taxCalc = await findByTestId(TAX_CALC_ID);

    expect(taxCalc).toBeInstanceOf(HTMLElement);
  });

  it('should show error message when tax years could not be fetched', async () => {
    const errorMessage = 'Ooops';
    (fetchTaxYears as Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { findByText } = render(
      <Theme>
        <TaxCalculator />
      </Theme>,
    );

    const error = await findByText(errorMessage);

    expect(error).toBeInstanceOf(HTMLElement);
  });
});
