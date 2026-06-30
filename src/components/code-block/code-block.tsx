import type { FC } from 'react';
import { cn } from '../../utils/style-helpers';
import { CopyButton } from '../copy-button';
import styles from './code-block.module.scss';

export interface CodeBlockProps {
  code: string;
  filename?: string;
  surface?: 'paper' | 'chalkboard';
}

export function CodeBlock({ code, filename, surface = 'paper' }: CodeBlockProps) {
  return (
    <div className={cn(styles.codeBlock, surface === 'chalkboard' && styles.chalkboard)}>
      {filename && (
        <div className={cn(styles.header, surface === 'chalkboard' && styles.chalkboardHeader)}>
          <span>{filename}</span>
          <CopyButton text={code} variant="light" surface={surface} />
        </div>
      )}
      {!filename && (
        <div className={styles.relative}>
          <div className={styles.copyOverlay}>
            <CopyButton text={code} variant="dark" surface={surface} />
          </div>
        </div>
      )}
      <pre className={cn(styles.pre, surface === 'chalkboard' && styles.chalkboardPre)}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
