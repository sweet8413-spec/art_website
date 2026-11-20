type IconProps = { size?: number; strokeWidth?: number }

const base = (size: number, strokeWidth: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  'aria-hidden': true,
})

export const SearchIcon = ({ size = 20, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(size, strokeWidth)}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
)

export const ChevronLeft = ({ size = 18, strokeWidth = 1.5 }: IconProps) => (
  <svg {...base(size, strokeWidth)}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
)

export const ChevronRight = ({ size = 18, strokeWidth = 1.5 }: IconProps) => (
  <svg {...base(size, strokeWidth)}>
    <path d="M9 6l6 6-6 6" />
  </svg>
)

export const ArrowRight = ({ size = 16, strokeWidth = 1.5 }: IconProps) => (
  <svg {...base(size, strokeWidth)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const RotateIcon = ({ size = 13, strokeWidth = 1.8 }: IconProps) => (
  <svg {...base(size, strokeWidth)}>
    <path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4" />
  </svg>
)
