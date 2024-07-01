import { Callout } from '@radix-ui/themes';
import { create } from '@stylexjs/stylex';
import type { ComponentProps, FC, ReactNode } from 'react';
import { sx } from '../styles/sx';

export type NotificationProps = ComponentProps<typeof Callout.Root> & {
  icon?: ReactNode;
  action?: ReactNode;
  testId?: string;
};

export const Notification: FC<NotificationProps> = ({
  children,
  className,
  icon,
  action,
  testId,
  ...props
}) => {
  return (
    <Callout.Root {...props} {...sx(root, className)} data-testid={testId}>
      {icon && <Callout.Icon>{icon}</Callout.Icon>}
      <Callout.Text>{children}</Callout.Text>
      {action && <Callout.Icon {...sx(actionStyle)}>{action}</Callout.Icon>}
    </Callout.Root>
  );
};

const { root, actionStyle } = create({
  root: {
    display: 'flex',
  },
  actionStyle: {
    marginLeft: 'auto',
  },
});
