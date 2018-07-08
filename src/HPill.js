import React from 'react'
export default function HPill({fill = 'white', 
                              stroke ='black', 
                              width = 100,
                              height = 50,
                              strokeWidth = 4}) {
  const r = height * 0.5
  return   (
  <symbol id="hpill" viewBox={`0 0 ${width + height + 2 * strokeWidth} ${height + 2 * strokeWidth}`}>
    <path 
      fill={fill} 
      stroke={stroke} 
      strokeWidth={strokeWidth} 
      d={`M ${r + strokeWidth},${strokeWidth} 
          L ${r + width + strokeWidth},${strokeWidth}
          A ${r},${r} 0 0 1 ${r + width + strokeWidth},${height+strokeWidth}
          L ${r + strokeWidth},${height + strokeWidth}
          A ${r},${r} 0 0 1 ${r + strokeWidth},${strokeWidth}Z`}/>
  </symbol>)
}