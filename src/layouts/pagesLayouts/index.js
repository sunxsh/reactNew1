import React, { memo } from 'react'
import PropTypes from 'prop-types'

const Index = memo(function Index({children,className}) {
  return (
    <div className={className}>
       {children}
    </div>
  )
})

Index.propTypes = {
  className:PropTypes.string
}

Index.defaultProps = {
  className:'bgW padding-20px'
}


export default Index;
