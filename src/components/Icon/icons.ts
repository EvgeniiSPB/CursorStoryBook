import type { FunctionComponent, SVGProps } from 'react';
import type { IconName, IconSize } from './types';
import { isIconAvailable } from './types';

import ArrowLeft20 from '../../assets/icons/20/arrow-left.svg?react';
import ArrowRight20 from '../../assets/icons/20/arrow-right.svg?react';
import ArrowUp20 from '../../assets/icons/20/arrow-up.svg?react';
import ArrowUpRight20 from '../../assets/icons/20/arrow-up-right.svg?react';
import Audio20 from '../../assets/icons/20/audio.svg?react';
import Bookmark20 from '../../assets/icons/20/bookmark.svg?react';
import Check20 from '../../assets/icons/20/check.svg?react';
import Close20 from '../../assets/icons/20/close.svg?react';
import Content20 from '../../assets/icons/20/content.svg?react';
import Kebab20 from '../../assets/icons/20/kebab.svg?react';
import Lock20 from '../../assets/icons/20/lock.svg?react';
import Menu20 from '../../assets/icons/20/menu.svg?react';
import Minus20 from '../../assets/icons/20/minus.svg?react';
import Plus20 from '../../assets/icons/20/plus.svg?react';
import Profile20 from '../../assets/icons/20/profile.svg?react';
import Search20 from '../../assets/icons/20/search.svg?react';
import Shield20 from '../../assets/icons/20/shield.svg?react';
import Video20 from '../../assets/icons/20/video.svg?react';

import ArrowLeft28 from '../../assets/icons/28/arrow-left.svg?react';
import ArrowRight28 from '../../assets/icons/28/arrow-right.svg?react';
import Check28 from '../../assets/icons/28/check.svg?react';
import Close28 from '../../assets/icons/28/close.svg?react';
import Plus28 from '../../assets/icons/28/plus.svg?react';

export type IconComponent = FunctionComponent<SVGProps<SVGSVGElement>>;

const icons20 = {
  'arrow-left': ArrowLeft20,
  'arrow-right': ArrowRight20,
  'arrow-up': ArrowUp20,
  'arrow-up-right': ArrowUpRight20,
  audio: Audio20,
  bookmark: Bookmark20,
  check: Check20,
  close: Close20,
  content: Content20,
  kebab: Kebab20,
  lock: Lock20,
  menu: Menu20,
  minus: Minus20,
  plus: Plus20,
  profile: Profile20,
  search: Search20,
  shield: Shield20,
  video: Video20,
} satisfies Record<string, IconComponent>;

const icons28 = {
  'arrow-left': ArrowLeft28,
  'arrow-right': ArrowRight28,
  check: Check28,
  close: Close28,
  plus: Plus28,
} satisfies Record<string, IconComponent>;

export function resolveIconComponent(
  name: IconName,
  size: IconSize,
): IconComponent | null {
  if (!isIconAvailable(name, size)) {
    return null;
  }
  if (size === 28) {
    return icons28[name as keyof typeof icons28] ?? null;
  }
  return icons20[name as keyof typeof icons20] ?? null;
}
