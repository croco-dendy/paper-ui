import type { CSSProperties, ReactNode } from 'react';
import { createAccentClassMap } from '../../utils/accent-class-map';
import { cn } from '../../utils/style-helpers';
import { type TextureProp, resolveTexture } from '../../utils/textures';
import styles from './page.module.scss';

export interface PageProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  texture?: TextureProp;
  withAccent?: boolean;
  accentColor?: 'blue' | 'green' | 'amber' | 'rose' | 'slate';
  rounded?: 'all' | 'top' | 'none';
}

const accentClassMap = createAccentClassMap(styles);

export function Page({
  children,
  className,
  style,
  texture = true,
  withAccent = false,
  accentColor = 'blue',
  rounded = 'all',
}: PageProps) {
  const textureStyles = resolveTexture(texture, {
    texture: 'white',
    ruledType: 'lines',
    ruledColor: 'blue',
  }) ?? { backgroundColor: 'var(--pui-bg-base)' };

  return (
    <div
      className={cn(
        styles.page,
        withAccent && styles.withAccent,
        withAccent && accentClassMap[accentColor],
        rounded === 'top' && styles.roundedTop,
        className,
      )}
      style={{ ...textureStyles, ...style }}
    >
      {children}
    </div>
  );
}
