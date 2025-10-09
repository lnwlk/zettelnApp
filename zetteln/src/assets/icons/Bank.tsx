import * as React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
}

const Bank: React.FC<IconProps> = ({ size = 24, className, ...props }) => {
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
      <path d="M3 9.5 12 4l9 5.5M5 20h14M10 9h4M6 17v-5M10 17v-5M14 17v-5M18 17v-5" />
    </svg>
  )
}

export default Bank
