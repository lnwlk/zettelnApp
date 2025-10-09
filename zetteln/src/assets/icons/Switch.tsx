import * as React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const ArrowRight: React.FC<IconProps> = ({ size = 24, className, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M20,7h-1" />
      <path d="M15,7h-1" />
      <path d="M4,17h16M20,17l-3,3M20,17l-3-3" />
      <path d="M10,7h-6M4,7l3,3M4,7l3-3" />
    </svg>
  )
}

export default ArrowRight
