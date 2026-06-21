import { LayoutVerticalPaddingRuler } from '../shared/LayoutPaddingRuler';
import { SECTION_HEADLINE_T_PADDING_PX } from './types';

/** Storybook overlay — highlights top padding with px label. */
export function SectionHeadlinePaddingRuler({
  px = SECTION_HEADLINE_T_PADDING_PX,
}: {
  px?: number;
}) {
  return <LayoutVerticalPaddingRuler px={px} />;
}
