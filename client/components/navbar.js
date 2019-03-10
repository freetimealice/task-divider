import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    {isLoggedIn ? (
      <React.Fragment>
        <Link to="/home">
          <div className="logo">
            <img align="center" src="/fun_chores.png" />
            <h1 align="bottom">Chore Counselor</h1>
          </div>
        </Link>
        <nav className="nav-center">
          <div className="nav-wrapper container">
            {/* The navbar will show these links after you log in */}
            {/* <Link to="/home">Home</Link> */}
            <ul>
              <li>
                <Link to="/add-tasks">Add Weekly Chores</Link>
              </li>
              <li>
                <Link to="/user/1">User 1</Link>
              </li>
              <li>
                <Link to="/user/2">User 2</Link>
              </li>
              {/* <Link to="/chore-distribution">Game Time!</Link> */}
              <li>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    ) : (
      <div />
    )}
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.account.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
