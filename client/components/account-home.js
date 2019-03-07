import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const AccountHome = props => {
  const {name} = props

  return (
    <div>
      <h3>Welcome, {name}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.account.name
  }
}

export default connect(mapState)(AccountHome)

/**
 * PROP TYPES
 */
AccountHome.propTypes = {
  name: PropTypes.string
}
