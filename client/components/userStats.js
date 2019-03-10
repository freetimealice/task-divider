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
      return res
    }
  }
  let data = calcValue()
  console.log('data', data)
  const userNum = props.match.params.userNum
  return props.account && !(data === undefined) ? (
    <div className="container">
      <h1 className="center-align"> User {userNum} Details</h1>
      <PieChart
        data={data}
        width={200}
        height={200}
        innerRadius={60}
        outerRadius={100}
      />
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
