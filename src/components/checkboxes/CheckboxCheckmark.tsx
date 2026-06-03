import type { SVGAttributes } from 'react';

const CHECK_PATH =
  'M12.9824 0.170975C13.2174 -0.0589531 13.5946 -0.0566301 13.8271 0.175858C14.063 0.411992 14.0608 0.795923 13.8222 1.02937L5.91109 8.76766C5.73428 8.94063 5.47799 8.98259 5.26265 8.89363C5.18692 8.86442 5.11575 8.81993 5.05464 8.75887L0.175736 3.87996C-0.0585787 3.64565 -0.0585787 3.26564 0.175736 3.03133C0.409992 2.79728 0.789123 2.7973 1.02339 3.03133L5.49214 7.4991L12.9824 0.170975Z';

/** Figma `toggle` icon bounds (4113:9402) — viewBox from export */
const VIEWBOX = '0 0 14.0026 8.93896';

export interface CheckboxCheckmarkProps extends SVGAttributes<SVGSVGElement> {
  muted?: boolean;
}

export function CheckboxCheckmark({ muted = false, className, ...props }: CheckboxCheckmarkProps) {
  return (
    <svg
      className={className}
      viewBox={VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      overflow="visible"
      aria-hidden
      {...props}
    >
      <path d={CHECK_PATH} fill="#ffffff" fillOpacity={muted ? 0.6 : 1} />
    </svg>
  );
}
