import { Text } from '@radix-ui/themes';
import { create } from '@stylexjs/stylex';
import type { FC, ReactNode } from 'react';
import { sx } from '../styles/sx';
import type { TextLabelProps } from '../types/radix';

export type SelectControlProps = Omit<TextLabelProps, 'as'> & {
  label?: ReactNode;
  htmlFor?: string;
  className?: string;
  children?: ReactNode;
};

export interface SelectOption {
  value: string;
  label?: ReactNode;
}

export const FormControl: FC<SelectControlProps> = ({
  label,
  className,
  children,
  ...props
}) => {
  return (
    <Text size="2" {...props} {...sx(control, className)} as="label">
      {label && (
        <Text as="span" {...sx(labelStyle)}>
          {label}
        </Text>
      )}
      {children}
    </Text>
  );
};

const { control, labelStyle } = create({
  control: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 2,
  },
  labelStyle: {
    alignSelf: 'start',
  },
});
