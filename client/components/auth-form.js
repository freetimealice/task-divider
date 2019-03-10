import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="valign-wrapper row login-box">
      <div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4">
        <form onSubmit={handleSubmit} name={name}>
          <div className="card-content">
            <div className="login-container">
              <img src="/people.png" />
              <div className="login-title">
                <span className="card-title">Chore Counselor</span>
                Please log in or sign up
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="accountName">
                  <small>Account Name</small>
                </label>
                <input name="accountName" type="text" required />
              </div>
              <div className="input-field col s12">
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" required />
              </div>
              {name === 'signup' ? (
                <React.Fragment>
                  <div className="input-field col s8">
                    <label htmlFor="user1">
                      <small>User 1</small>
                    </label>
                    <input name="user1" type="text" required />
                  </div>
                  <div className="input-field col s8">
                    <label htmlFor="user2">
                      <small>User 2</small>
                    </label>
                    <input name="user2" type="text" required />
                  </div>{' '}
                </React.Fragment>
              ) : (
                <div />
              )}

              <div className="col s12">
                <button
                  className="btn waves-effect waves-light right-align"
                  type="submit"
                  name="action"
                >
                  {displayName}
                </button>
              </div>
              {name === 'login' ? (
                <div className="col s12">
                  <Link to="/signup">Sign Up</Link>
                </div>
              ) : (
                <div className="col s12">
                  <Link to="/login">Already have an account?</Link>
                </div>
              )}
              {error &&
                error.response && (
                  <div className="col s12"> {error.response.data} </div>
                )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.account.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.account.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const accountName = evt.target.accountName.value
      const password = evt.target.password.value
      const user1 = evt.target.user1 ? evt.target.user1.value : ''
      const user2 = evt.target.user2 ? evt.target.user2.value : ''
      dispatch(auth(accountName, password, formName, user1, user2))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
