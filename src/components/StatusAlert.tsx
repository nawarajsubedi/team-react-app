import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

import './status-alert.css';

interface StatusAlertProps {
  message: string;
  variant?: 'success' | 'failure' | 'warning';
  show?: boolean;
  delay?: number;
  onDismiss?: () => void;
}

const variants = new Map([
  ['success', { variant: 'success', prefix: 'Success', icon: 'bi-check-circle-fill' }],
  ['failure', { variant: 'danger', prefix: 'Failure', icon: 'bi-exclamation-octagon-fill' }],
  ['warning', { variant: 'warning', prefix: 'Warning', icon: 'bi-exclamation-triangle-fill' }],
]);

function StatusAlert({
  message,
  variant = 'success',
  show = false,
  delay = 3000,
  onDismiss,
}: StatusAlertProps) {
  const [isShow, setIsShow] = useState(show);

  useEffect(() => {
    setIsShow(show);
  }, [show]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(false);
      if (onDismiss) onDismiss();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, onDismiss]);

  const config = variants.get(variant) || variants.get('success');

  return (
    <Alert className="status-alert" variant={config?.variant} show={isShow}>
      <i className={config?.icon} />
      <strong className="mx-2">{config?.prefix}:</strong>{message}
    </Alert>
  );
}

export default StatusAlert;