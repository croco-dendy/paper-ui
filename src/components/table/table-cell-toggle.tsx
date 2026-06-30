import { cn } from '../../utils/style-helpers';
import styles from './cells.module.scss';

export interface TableCellToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  surface?: 'paper' | 'chalkboard';
}

export function TableCellToggle({ checked, onChange, surface = 'paper' }: TableCellToggleProps) {
  return (
    <button
      type="button"
      className={cn(
        styles.toggle,
        surface === 'chalkboard' && styles.chalkToggle,
        checked && styles.toggleActive,
        checked && surface === 'chalkboard' && styles.chalkToggleActive,
      )}
      onClick={() => onChange(!checked)}
    >
      {checked ? 'true' : 'false'}
    </button>
  );
}
