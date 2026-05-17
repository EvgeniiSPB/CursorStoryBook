import type { TagType } from './Tag';

/** Figma ic_20_arrow_right (node 4:130) */
const IC_20_ARROW_RIGHT_PATH =
  'M5.5982 0.131802C5.42246 -0.043934 5.13754 -0.043934 4.9618 0.131802C4.78607 0.307538 4.78607 0.592462 4.9618 0.768198L7.7636 3.57H0.48C0.214903 3.57 0 3.7849 0 4.05C0 4.3151 0.214903 4.53 0.48 4.53H7.7636L4.9618 7.3318C4.78607 7.50754 4.78607 7.79246 4.9618 7.9682C5.13754 8.14393 5.42246 8.14393 5.5982 7.9682L9.5164 4.05L5.5982 0.131802Z';

const variantClass: Record<TagType, string> = {
  brand: 'tag-group__icon--brand',
  brandConstantInverted: 'tag-group__icon--brand-constant-inverted',
};

/** icon20 - container → Viewbox 12×12 → Shape inset 16.25% / 9.7% / 11% */
export function TagGroupIcon({ variant = 'brand' }: { variant?: TagType }) {
  return (
    <span
      className={`tag-group__icon ${variantClass[variant]}`}
      aria-hidden
    >
      <span className="tag-group__icon-viewbox">
        <span className="tag-group__icon-shape">
          <svg
            className="tag-group__icon-svg"
            viewBox="0 0 9.5164 8.1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="currentColor" d={IC_20_ARROW_RIGHT_PATH} />
          </svg>
        </span>
      </span>
    </span>
  );
}
