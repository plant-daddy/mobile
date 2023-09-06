import * as React from 'react'
import Svg, { Circle, Path, type SvgProps } from 'react-native-svg'

export const Water = (props: SvgProps) => {
  return (
    <Svg width={23} height={23} viewBox="0 0 23 23" fill="none" {...props}>
      <Circle cx={11.5} cy={11.5} r={11.5} fill="#D6EDFF" />
      <Path
        d="M11.684 6L15 9.316a4.687 4.687 0 11-6.626 0L11.684 6z"
        fill="#5DADEC"
        stroke="#5DADEC"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
