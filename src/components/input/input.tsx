import { useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './input.module.scss';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  size?: 'small' | 'medium' | 'large';
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

export function Input({
  label,
  helperText,
  error = false,
  size = 'medium',
  surface = 'paper',
  className,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn(styles.wrapper, surface === 'chalkboard' && styles.chalkboard, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(styles.input, styles[size], error && styles.error)}
        {...props}
      />
      {helperText && (
        <span className={cn(styles.helperText, error && styles.helperError)}>{helperText}</span>
      )}
    </div>
  );
}
