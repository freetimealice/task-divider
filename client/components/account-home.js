import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const AccountHome = props => {
  const {name} = props

  return (
    <div className="row">
      <div className="col s3" />
      <div className="col s6 welcome">
        <h3>Welcome!</h3>
        <br />

        <p>
          No one looks forward to cleaning the toilet bowl or scrubbing the
          bathtub, but we can at least make it fun by instilling a bit of{' '}
          <b>luck</b> and <b>fairness</b> into your chore assignment system.
        </p>
        <p>
          This app is meant to be played between two users who share
          responsibilities.
        </p>
        <p>The assignment works as follows: </p>
        <ol>
          <li>Navigate to the Add Weekly Chores page.</li>
          <li>
            Together with your partner, brainstorm chores for the week. There's
            a hint on which week you're up to! So, if you're using assigning
            chores for the first time, you should enter chores for week 1. There
            are already some examples of what you can input for each chore's
            detail.
          </li>
          <li>
            After you've added all expected chores, continue onto ranking! User
            1 ranks first. Rank your chore preference by dragging your most
            preferred chores to the top, with the least preferred chores at the
            bottom.
          </li>
          <li>
            After User 1 has ranked all the chores, User 2 will now do the same!
          </li>
          <li>
            Finally, it's time to assign the chores! Click on "roll roll roll"
            for the system to decide who gets which chore for the week and
            "Unveil" to see your assigned chores!{' '}
          </li>
        </ol>
        <p>
          Our app does the heavy computing on who gets assigned which chore, by
          taking three factors into consideration:
        </p>
        <ol>
          <li>
            {' '}
            Ranking: The higher you ranked a chore, the more likely you'll win
            that chore!
          </li>
          <li>
            {' '}
            Time: Each chore takes different amounts of time to complete. Both
            users should be allocated a fairly similar amount of chores, not by
            number of chores, but by how long it takes to complete all the
            assigned chores.{' '}
          </li>
          <li>
            {' '}
            Randomness: It's no fun without a bit of randomness involved! May
            luck be on your side!
          </li>
        </ol>

        <p>
          You have the option to save your chores to your Google Tasks, making
          it easy to keep track of your to-dos.
        </p>
        <p>
          For reminders of your weekly chore, navigate to your personal user
          page. That page visualizes which chores you spend the most time on,
          across <b>ALL</b> weeks. Separately, you can also see the chores
          you've been assigned for the latest week.
        </p>
      </div>
      <div className="col s3" />
    </div>
  )
}

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
