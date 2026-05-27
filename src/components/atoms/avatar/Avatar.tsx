import type { CSSProperties, ImgHTMLAttributes } from 'react';
import { TextCore } from '../text-core/TextCore';
import avatarSampleUrl from '../../../assets/avatar/avatar-sample.png';
import {
  AVATAR_DEFAULT_INITIALS,
  avatarImageSizeToCssVar,
  type AvatarImageSize,
  type AvatarType,
} from './types';
import './avatar.css';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'type'> {
  type?: AvatarType;
  imageSize?: AvatarImageSize;
  initials?: string;
  /** Used when `type="image"`; defaults to Figma sample photo. */
  src?: string;
  className?: string;
}

export function Avatar({
  type = 'image',
  imageSize = '8x',
  initials = AVATAR_DEFAULT_INITIALS,
  src = avatarSampleUrl,
  className,
  alt = '',
  ...imgProps
}: AvatarProps) {
  const rootClasses = ['avatar', `avatar--${type}`, className].filter(Boolean).join(' ');

  const style = {
    '--avatar-size': avatarImageSizeToCssVar(imageSize),
  } as CSSProperties;

  if (type === 'image') {
    return (
      <div className={rootClasses} style={style}>
        <img className="avatar__image" src={src} alt={alt} {...imgProps} />
      </div>
    );
  }

  return (
    <div className={rootClasses} style={style}>
      <div className="avatar__bound avatar__bound--initials">
        <TextCore typography="special" text={initials} className="avatar__initials" />
      </div>
    </div>
  );
}
