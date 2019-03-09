import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchTasks, fetchLatestWeek} from '../store/task'
import {fetchRanks, saveAssignment, fetchAssignments} from '../store/ranking'

const ChoreDistribution = props => {
  const [user1, setUser1] = useState(0)
  const [counter, setCounter] = useState(0)
  const [steps, setSteps] = useState(0)

  const assignChores = () => {
    setUser1(user1 + 1)
  }

  const submitHandler = event => {
    event.preventDefault()
    setSteps(steps => steps + 1)
    if (steps > 0) {
      alert('All tasks have been asigned')
      return false
    }

    while (counter < 4) {
      setCounter(counter + 1)
    }
  }
  return (
    <div>
      <button type="submit" onClick={submitHandler}>
        Roll roll roll!
      </button>
      <p>counter</p>
    </div>
  )
}

const mapStateToProps = state => ({
  account: state.account,
  tasks: state.tasks,
  ranking: state.ranking,
  week: state.week,
  assignments: state.assignments
})

const mapDispatchToProps = dispatch => ({
  fetchTasks: (accountId, week) => {
    dispatch(fetchTasks(accountId, week))
  },
  fetchLatestWeek: accountId => {
    dispatch(fetchLatestWeek(accountId))
  },
  fetchRanks: (accountId, week) => {
    dispatch(fetchRanks(accountId, week))
  },
  saveAssignment: (taskId, winnerUserNum) => {
    dispatch(saveAssignment(taskId, winnerUserNum))
  },
  fetchAssignments: (accountId, week) => {
    console.log('fetchassignments dispatch', accountId, week)
    dispatch(fetchAssignments(accountId, week))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ChoreDistribution)
