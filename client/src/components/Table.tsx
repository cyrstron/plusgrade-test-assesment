import { Table as RadixTable } from '@radix-ui/themes';
import type { FC, ReactNode } from 'react';

type TableDict = Record<string, string | number | undefined | null>;

export type ColumnDef<TData extends TableDict = TableDict> = {
  title: string;
  name: string;
  accessor?: (row: Omit<TData, 'key'>) => ReactNode;
};

export interface TableProps<TData extends TableDict = TableDict> {
  className?: string;
  columnDefs: ColumnDef<TData>[];
  data: Array<TData & { key: string }>;
}

export function Table<TData extends TableDict = TableDict>({
  className,
  columnDefs,
  data,
}: TableProps<TData>): ReturnType<FC> {
  return (
    <RadixTable.Root className={className}>
      <RadixTable.Header>
        <RadixTable.Row>
          {columnDefs.map(({ title, name }) => (
            <RadixTable.ColumnHeaderCell align="center" key={name}>
              {title}
            </RadixTable.ColumnHeaderCell>
          ))}
        </RadixTable.Row>
      </RadixTable.Header>
      <RadixTable.Body>
        {data.map(({ key, ...row }) => (
          <RadixTable.Row key={key}>
            {columnDefs.map(({ name, accessor }) => (
              <RadixTable.Cell key={name} align="right">
                {accessor?.(row) ?? row[name]}
              </RadixTable.Cell>
            ))}
          </RadixTable.Row>
        ))}
      </RadixTable.Body>
    </RadixTable.Root>
  );
}
