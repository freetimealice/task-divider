import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchTasks, fetchLatestWeek} from '../store/task'
import {fetchRanks, saveAssignment, fetchAssignments} from '../store/ranking'
import PieChart from './pieChart'

const UserStats = props => {
  useEffect(
    () => {
      if (props.account.id) {
        props.fetchLatestWeek(props.account.id)
        props.fetchAssignments(props.account.id, 0)
      }
    },
    [props.account]
  )

  const calcValue = () => {
    const userNum = props.match.params.userNum
    const assignments = props.assignments[`UserNum: ${userNum}`]
    let res = []
    let namesArr = []
    if (assignments) {
      assignments.forEach(task => {
        if (!namesArr.includes(task.name)) {
          res.push({name: task.name, totalTime: task.totalTime})
          namesArr.push(task.name)
        } else {
          res.forEach(taskObjs => {
            if (taskObjs.name === task.name) {
              taskObjs.totalTime += task.totalTime
            }
          })
        }
      })
      return res.sort((a, b) => b.totalTime - a.totalTime)
    }
  }
  let data = calcValue()

  const userNum = props.match.params.userNum
  return props.account && !(data === undefined) ? (
    <div className="container">
      <h2 className="center-align"> User {userNum} Details</h2>
      <h4>Past Chores Assigned</h4>
      <div className="userDetails">
        <PieChart
          data={data}
          width={500}
          height={500}
          innerRadius={150}
          outerRadius={250}
        />

        <table className="historical-data">
          <thead>
            <tr>
              <th>Chore Name</th>
              <th>Total Time Spent (mins)</th>
            </tr>
          </thead>
          <tbody>
            {data.map(currData => (
              <tr key={currData.name}>
                <td>{currData.name}</td>
                <td>{currData.totalTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <h4> Most Recent Week's Chores (Week {`${props.week}`})</h4>
      <div className="userDetails">
        <table className="historical-data">
          <thead>
            <tr>
              <th>Chore Name</th>
              <th>Frequency</th>
              <th>Duration</th>
              <th>Total Time</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {props.assignments[`UserNum: ${userNum}`]
              .filter(task => task.week === props.week)
              .map(currTask => {
                const {name, frequency, duration, totalTime, notes} = currTask
                return (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{frequency}</td>
                    <td>{duration}</td>
                    <td>{totalTime}</td>
                    <td>{notes}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <p>Loading...!</p>
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
    console.log('in fetchingassignment')
    dispatch(fetchAssignments(accountId, week))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(UserStats)
