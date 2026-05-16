import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

export type ButtonVariant = 'filled' | 'outlined';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, CSSProperties> = {
  filled: {
    color: 'var(--badge-filled-base-text)',
    backgroundColor: 'var(--primary-primary)',
    border: '1px solid transparent',
  },
  outlined: {
    color: 'var(--badge-outlined-base-text)',
    backgroundColor: 'transparent',
    border: '1px solid var(--badge-outlined-base-border)',
  },
};

export function Button({
  children,
  variant = 'filled',
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      style={{
        fontFamily: 'inherit',
        fontSize: 'var(--font-sizes-body-m)',
        fontWeight: 500,
        lineHeight: 'var(--line-heights-body-m)',
        padding: 'var(--spaces-static-200) var(--spaces-static-400)',
        borderRadius: 'var(--x-base-200)',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease',
        ...variantStyles[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (variant === 'filled') {
          e.currentTarget.style.backgroundColor = 'var(--hover)';
        }
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        if (variant === 'filled') {
          e.currentTarget.style.backgroundColor = 'var(--primary-primary)';
        }
        props.onMouseLeave?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
}
