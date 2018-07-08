import React from 'react'
export default function VPill({fill = 'white', 
                              stroke ='black', 
                              width = 100,
                              height = 50,
                              strokeWidth = 4}) {
  const r = height * 0.5
  return   (
  <symbol id="vpill" viewBox={`0 0 ${height + 2 * strokeWidth} ${width + height + 2 * strokeWidth}`}>
    <path 
      fill={fill} 
      stroke={stroke}
      strokeWidth={strokeWidth} 
      d={`M ${strokeWidth},${r + strokeWidth}
          L ${strokeWidth},${r + width + strokeWidth}
          A ${r},${r} 1 0 0 ${height+strokeWidth},${r + width + strokeWidth}
          L ${height + strokeWidth},${r + strokeWidth}
          A ${r},${r} 1 0 0 ${strokeWidth},${r + strokeWidth}Z`}/>
  </symbol>)
}