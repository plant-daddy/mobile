import * as React from 'react'
import Svg, { Circle, Path, type SvgProps } from 'react-native-svg'

export const Fertilize = (props: SvgProps) => {
  return (
    <Svg width={23} height={23} viewBox="0 0 23 23" fill="none" {...props}>
      <Circle cx={11.5} cy={11.5} r={11.5} fill="#F4E0D7" />
      <Path
        d="M17.25 6.75v1.167A4.083 4.083 0 0113.167 12h-.584v.583H15.5v4.084c0 .644-.522 1.166-1.167 1.166H9.667A1.166 1.166 0 018.5 16.667v-4.084h2.917v-1.75A4.083 4.083 0 0115.5 6.75h1.75zm-9.042-.583c1.476 0 2.78.73 3.573 1.848a4.64 4.64 0 00-.948 2.818v.584h-.291a4.375 4.375 0 01-4.375-4.375v-.875h2.041z"
        fill="#D8B3A3"
      />
    </Svg>
  )
}
