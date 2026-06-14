import { Icon } from '../../Icon';

/** Figma `ic_20_arrow_right_diagonal` inside `icon20 - container` (4190:2627). */
export function ButtonTextIconArrowIcon({ className }: { className?: string }) {
  return (
    <span
      className={['button-text-icon-arrow-icon', className].filter(Boolean).join(' ')}
      aria-hidden
    >
      <span className="button-text-icon-arrow-icon__frame">
        <span className="button-text-icon-arrow-icon__shape">
          <Icon name="arrow-right" size={20} inheritColor className="button-text-icon-arrow-icon__glyph" />
        </span>
      </span>
    </span>
  );
}
