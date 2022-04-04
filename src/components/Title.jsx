import React from 'react'

const Title = (props) => {
  return (
    <h1 className="bg-primary text-white-50 text-center py-3" >{ props.children }</h1>
  )
}

export default Title