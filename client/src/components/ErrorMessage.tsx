import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import type { FC, ReactNode } from 'react';
import { Notification } from './Notification';

export interface ErrorMessageProps {
  children: ReactNode;
  className?: string;
  onRetry?: () => void;
  testId?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ onRetry, ...props }) => {
  return (
    <Notification
      color="red"
      icon={<ExclamationTriangleIcon />}
      {...props}
      action={
        onRetry && (
          <Button color="red" onClick={onRetry}>
            Retry
          </Button>
        )
      }
    />
  );
};
