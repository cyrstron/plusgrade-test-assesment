import { Button, Grid } from '@radix-ui/themes';
import { create } from '@stylexjs/stylex';
import { type FC, type FormEvent, useState } from 'react';
import { InputControl } from '../components/InputControl';
import { SelectControl } from '../components/SelectControl';
import {
  selectIncome,
  selectTaxCalcPending,
  selectTaxYear,
  selectTaxYears,
} from '../state/taxes/selectors';
import { useTaxesStore } from '../state/taxes/store';
import { sx } from '../styles/sx';

export interface IncomeFormProps {
  className?: string;
}

export const IncomeForm: FC<IncomeFormProps> = ({ className }) => {
  const submitTaxYear = useTaxesStore((state) => state.submitTaxYear);
  const taxYears = useTaxesStore(selectTaxYears);
  const initialYear = useTaxesStore(selectTaxYear);
  const initialIncome = useTaxesStore(selectIncome);
  const isDisabled = useTaxesStore(selectTaxCalcPending);

  const [year, setYear] = useState(initialYear ?? taxYears[0]);
  const [income, setIncome] = useState(initialIncome ?? 0);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await submitTaxYear({ year, income });
  };

  return (
    <form onSubmit={onSubmit} {...sx(className)}>
      <Grid gap="2" columns="150px 1fr" rows="repeat(2, auto)" width="100%">
        <SelectControl
          label="Tax Year:"
          value={`${year}`}
          onChange={(value) => {
            setYear(+value);
          }}
          options={taxYears}
        />
        <InputControl
          value={`${income}`}
          label="Yearly income:"
          type="number"
          startIcon="$"
          min="0"
          onChange={(value) => {
            setIncome(+value);
          }}
        />
        <Button disabled={isDisabled} size="3" {...sx(submitBtn)}>
          Calculate!
        </Button>
      </Grid>
    </form>
  );
};

const { submitBtn } = create({
  submitBtn: {
    gridColumn: '1 / 3',
  },
});
