import React from 'react'
export default function HPill({fill = 'white', 
                              stroke ='black', 
                              width = 100,
                              height = 50,
                              strokeWidth = 2}) {
  const r = height * 0.5
  return   (
  <symbol id="pill" viewBox={`0 0 ${width + height} ${height + 2 * strokeWidth}`}>
    <path 
      fill={fill} 
      stroke={stroke} 
      d={`M ${r},${strokeWidth} 
          L ${r + width},${strokeWidth}
          A ${r},${r} 0 0 1 ${r + width},${height+strokeWidth}
          L ${r},${height + strokeWidth}
          A ${r},${r} 0 0 1 ${r},${strokeWidth}Z`}/>
  </symbol>)
}