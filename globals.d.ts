declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.svg' {
  import type React from 'react'
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVG
}
