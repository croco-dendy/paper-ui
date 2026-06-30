import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './swatch.module.scss';

export interface SwatchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  disabled?: boolean;
  surface?: 'paper' | 'chalkboard';
}

export function Swatch({
  active = false,
  disabled = false,
  surface = 'paper',
  className,
  style,
  ...props
}: SwatchProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        styles.swatch,
        active && styles.active,
        disabled && styles.disabled,
        surface === 'chalkboard' && styles.chalkboard,
        className,
      )}
      style={style}
      {...props}
    />
  );
}
