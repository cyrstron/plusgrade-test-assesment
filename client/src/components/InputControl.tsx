import { TextField } from '@radix-ui/themes';
import type { FC, ReactNode } from 'react';
import type { InputType } from '../types/radix';
import { FormControl } from './FormControl';

export interface SelectControlProps {
  label?: ReactNode;
  value?: string;
  initialValue?: string;
  onChange: (value: string) => void;
  className?: string;
  min?: string;
  max?: string;
  placeholder?: string;
  startIcon?: ReactNode;
  type?: InputType;
}

export const InputControl: FC<SelectControlProps> = ({
  label,
  value,
  initialValue,
  onChange,
  className,
  startIcon,
  ...props
}) => {
  return (
    <FormControl label={label} className={className}>
      <TextField.Root
        value={value}
        defaultValue={initialValue}
        variant="classic"
        onChange={(e) => {
          onChange(e.target.value);
        }}
        {...props}
      >
        {startIcon && <TextField.Slot>{startIcon}</TextField.Slot>}
      </TextField.Root>
    </FormControl>
  );
};
