import type React from 'react';
import { type TextureConfig, getTextureStyles } from './textures';

export function getSurfaceTexture(surface?: string, texture?: TextureConfig): React.CSSProperties {
  if (texture) return getTextureStyles(texture);
  if (surface === 'chalkboard')
    return getTextureStyles({ texture: 'chalkboard', ruledType: 'none' });
  return getTextureStyles({ texture: 'paper', ruledType: 'none' });
}
