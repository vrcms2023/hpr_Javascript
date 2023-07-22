import React from 'react'

const Title = ( {title, cssClass} ) => {
  return (
    <h3 className={`${cssClass}`}>{title}</h3>
  )
}

export default Title