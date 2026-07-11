import { getApertureBlades } from '@/lib/utils';

interface ApertureMarkProps {
  size?: number;
  radius?: number;
  color?: string;
  strokeWidth?: number;
  bladeRefs?: React.MutableRefObject<(SVGPathElement | null)[]>;
  className?: string;
}

export function ApertureMark({
  size = 24,
  radius = 6.8,
  color = 'currentColor',
  strokeWidth = 0.9,
  bladeRefs,
  className,
}: ApertureMarkProps) {
  const { blades } = getApertureBlades(radius);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
      className={className}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
      focusable="false"
    >
      <g>
        {blades.map((blade, i) => (
          <g key={i} transform={`rotate(${blade.rotate})`}>
            <path
              ref={(el) => {
                if (bladeRefs) {
                  bladeRefs.current[i] = el;
                }
              }}
              d={blade.d}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              opacity={bladeRefs ? 0 : 1}
              style={{ transformOrigin: '0px 0px' }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
