import React, { memo } from 'react'
import PropTypes from 'prop-types'
import style from './status.module.scss'

const Status = memo(function Status({text,color}) {
  return (
    <>
      <span className={style.status} style={{background:color}}></span>
      <span>{text}</span>
    </>
  )
})

Status.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}

export default Status;
