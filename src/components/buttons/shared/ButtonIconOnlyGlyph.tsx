import { Icon } from '../../Icon';
import { ButtonPlaceholderIcon } from './ButtonPlaceholderIcon';
import './button-icon-only-glyph.css';

export type ButtonIconOnlyGlyphName = 'placeholder' | 'check' | 'plus';

/** Figma `icon28 - container` glyph inside `button - icon only`. */
export function ButtonIconOnlyGlyph({
  name = 'placeholder',
  className,
}: {
  name?: ButtonIconOnlyGlyphName;
  className?: string;
}) {
  if (name === 'placeholder') {
    return <ButtonPlaceholderIcon className={className} />;
  }

  return (
    <span
      className={['button-icon-only-glyph', `button-icon-only-glyph--${name}`, className]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      <span className="button-icon-only-glyph__viewbox">
        <span className="button-icon-only-glyph__expand">
          <Icon name={name} size={28} inheritColor className="button-icon-only-glyph__svg" />
        </span>
      </span>
    </span>
  );
}
