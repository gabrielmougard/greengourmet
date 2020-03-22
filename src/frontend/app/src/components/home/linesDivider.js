  
import React from 'react'


import lines from '../../assets/svg/lines.svg'

const LinesDivider = ({ style }) => (
  <div style={{
    position: 'absolute',
    bottom: 0,
    left: -2,
    width: '102%',
    height: 'auto',
    ...style
  }}>
    <img
      style={{
        margin: 0,
        display: "block",
        width:'100%',
        objectPosition: 'bottom',
        objectFit: 'cover'
      }}
      alt='Lines'
      src={lines}
    />
  </div>
)

export default LinesDivider