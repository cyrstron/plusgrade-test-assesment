import type { TextProps } from '@radix-ui/themes';

export type InputType =
  | 'number'
  | 'date'
  | 'search'
  | 'time'
  | 'text'
  | 'hidden'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'password'
  | 'tel'
  | 'url'
  | 'week';

export type TextLabelProps = TextProps & {
  as: 'label';
};
