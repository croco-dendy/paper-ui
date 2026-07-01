import { useMemo } from 'react';
import { roughGenerator } from '../../utils/rough';
import { cn } from '../../utils/style-helpers';
import styles from './progress.module.scss';

export interface ProgressProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  surface?: 'paper' | 'chalkboard';
  className?: string;
}

const VIEW_W = 300;
const VIEW_H = 20;
const MARGIN = 1;

export function Progress({
  value,
  max = 100,
  color,
  height = 6,
  surface = 'paper',
  className,
}: ProgressProps) {
  const pct = max > 0 ? Math.max(0, Math.min(100, Math.round((value / max) * 100))) : 0;
  const isChalkboard = surface === 'chalkboard';
  const seed = useMemo(() => Math.round(Math.random() * 1_000_000), []);

  const trackColor = isChalkboard ? 'rgba(200, 210, 195, 0.16)' : 'rgba(26, 25, 23, 0.12)';
  const fillColor = color ?? (isChalkboard ? '#d4e8cb' : '#68635C');

  const trackPaths = useMemo(
    () =>
      roughGenerator.toPaths(
        roughGenerator.rectangle(MARGIN, MARGIN, VIEW_W - MARGIN * 2, VIEW_H - MARGIN * 2, {
          seed,
          roughness: 1.6,
          fill: trackColor,
          fillStyle: 'solid',
          stroke: trackColor,
          strokeWidth: 1.5,
        }),
      ),
    [seed, trackColor],
  );

  const fillWidth = Math.max((pct / 100) * (VIEW_W - MARGIN * 2), 0);
  const fillPaths = useMemo(
    () =>
      fillWidth > 0
        ? roughGenerator.toPaths(
            roughGenerator.rectangle(MARGIN, MARGIN, fillWidth, VIEW_H - MARGIN * 2, {
              seed: seed + 1,
              roughness: 1.4,
              fill: fillColor,
              fillStyle: 'solid',
              stroke: fillColor,
              strokeWidth: 1,
            }),
          )
        : [],
    [seed, fillColor, fillWidth],
  );

  return (
    <div className={cn(styles.track, className)} style={{ height, borderRadius: height / 2 }}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {trackPaths.map((p, i) => (
          <path key={i} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill} />
        ))}
        {fillPaths.map((p, i) => (
          <path key={i} d={p.d} stroke={p.stroke} strokeWidth={p.strokeWidth} fill={p.fill} />
        ))}
      </svg>
    </div>
  );
}
