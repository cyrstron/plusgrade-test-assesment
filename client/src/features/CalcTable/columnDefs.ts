import type { ColumnDef } from '../../components/Table';
import { formatCurrency, formatPercents } from '../../helpers/formatters';
import type { TaxBandResult } from '../../schemas/taxBrackets';

export const columnDefs: ColumnDef<TaxBandResult>[] = [
  {
    name: 'brackets',
    title: 'Tax Bracket',
    accessor: ({ min, max }) => {
      if (!max) return `>= ${formatCurrency(min)}`;
      if (!min) return `<= ${formatCurrency(max)}`;

      return `${formatCurrency(min)} - ${formatCurrency(max)}`;
    },
  },
  {
    name: 'rate',
    title: 'Rate',
    accessor: ({ rate }) => {
      return formatPercents(rate);
    },
  },
  {
    name: 'taxes',
    title: 'Tax per Band',
    accessor: ({ tax }) => {
      return formatCurrency(tax);
    },
  },
];
