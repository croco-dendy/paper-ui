import type { ReactNode } from 'react';
import { cn } from '../../utils/style-helpers';
import styles from './island.module.scss';

export interface IslandProps {
  children: ReactNode;
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

export function Island({ children, surface = 'paper', className }: IslandProps) {
  return (
    <section
      className={cn(styles.island, surface === 'chalkboard' && styles.chalkboard, className)}
      aria-label="Controls"
    >
      {children}
    </section>
  );
}
