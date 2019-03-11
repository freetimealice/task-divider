import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchTasks, fetchLatestWeek} from '../store/task'
import {fetchRanks, saveAssignment, fetchAssignments} from '../store/ranking'
import GoogleTask from './googletask'

const ChoreDistribution = props => {
  const [user1, setUser1] = useState({
    totalTime: 0,
    tasks: [],
    rolled: 0,
    ranked: 0,
    time: 0,
    totalPoints: 0
  })

  const [user2, setUser2] = useState({
    totalTime: 0,
    tasks: [],
    rolled: 0,
    ranked: 0,
    time: 0,
    totalPoints: 0
  })
  const [totalTime, setTotalTime] = useState(0)
  const [steps, setSteps] = useState(0)

  useEffect(
    () => {
      if (props.tasks.length) {
        let totTime = props.tasks.reduce((total, task) => {
          return total + task.totalTime
        }, 0)
        setTotalTime(totTime)
      } else if (props.account && props.week) {
        props.fetchTasks(props.account.id, props.week)
        props.fetchRanks(props.account.id, props.week)
      } else if (props.account) {
        props.fetchLatestWeek(props.account.id)
      }
    },
    [props.week, props.tasks, props.assignments]
  )

  const assignChores = (task, user1TotalTime, user2TotalTime) => {
    const numOfTasks = props.tasks.length
    let updatedUsers = {
      user1: {},
      user2: {}
    }

    for (let i = 0; i < 2; i++) {
      let userNum = i + 1
      //calc RandNum
      const randNum = Math.floor(Math.random() * numOfTasks) + 1
      //calc Rank
      let rankingArr = props.ranking[`UserNum: ${userNum}`]
      let ind = rankingArr.findIndex(currTask => currTask.id === task.id)
      let taskRank = props.tasks.length - ind
      //calcTime
      let timeModifier = Math.round(
        numOfTasks * (Math.abs(user1TotalTime - user2TotalTime) / totalTime)
      )
      let userWithTimeModifier = user1TotalTime > user2TotalTime ? 1 : 2
      timeModifier = userNum === userWithTimeModifier ? -timeModifier : 0
      //update user
      updatedUsers[`user${userNum}`] = {
        rolled: randNum,
        ranked: taskRank,
        time: timeModifier,
        totalPoints: randNum + taskRank + timeModifier
      }
      console.log('task', task)
      console.log(`user${userNum} randNum`, randNum)
      console.log(`user${userNum} taskRank`, taskRank)
      console.log(`user${userNum} user1TotalTime, user2 TotalTime, `, taskRank)
      console.log(`user${userNum} time modifier`, timeModifier)
      console.log(
        `user${userNum} total points`,
        randNum + taskRank + timeModifier
      )
    }
    return updatedUsers
  }

  const submitHandler = event => {
    event.preventDefault()
    setSteps(steps => steps + 1)
    if (steps > 0) {
      alert('All tasks have been asigned')
      return false
    }

    let counter = 0
    let user1TotalTime = 0
    let user2TotalTime = 0
    while (counter < props.tasks.length) {
      counter++
      const currTask = props.tasks[Math.floor(counter - 1)]
      const updatedUsers = assignChores(
        currTask,
        user1TotalTime,
        user2TotalTime
      )
      let winner = ''
      if (updatedUsers.user1.totalPoints > updatedUsers.user2.totalPoints)
        winner = 1
      else if (
        updatedUsers.user1.totalPoints === updatedUsers.user2.totalPoints
      ) {
        winner = Math.floor(Math.random() * 2) + 1
      } else {
        winner = 2
      }

      if (winner === 1) {
        user1TotalTime += currTask.totalTime
        setUser1({
          ...updatedUsers.user1,
          totalTime: user1.totalTime + currTask.totalTime,
          tasks: [...user1.tasks, currTask]
        })
        setUser2(user2 => ({
          ...updatedUsers.user2,
          totalTime: user2.totalTime,
          tasks: user2.tasks
        }))
      } else {
        user2TotalTime += currTask.totalTime
        setUser1({
          ...updatedUsers.user1,
          totalTime: user1.totalTime,
          tasks: user1.tasks
        })
        setUser2(user2 => ({
          ...updatedUsers.user2,
          totalTime: user2.totalTime + currTask.totalTime,
          tasks: [...user2.tasks, currTask]
        }))
      }

      props.saveAssignment(currTask.id, winner)
      console.log('winner is', winner)
    }
  }

  const calcClassName = taskName => {
    let tasks = props.assignments[`UserNum: 1`].filter(task => {
      return task.name === taskName
    })
    return tasks.length > 0 ? 'move-left' : 'move-right'
  }
  console.log('rendering', props.assignments)
  return props.week ? (
    <div className="container">
      <h1 className="center-align"> Which chores will you win?</h1>
      <div className="center-align">
        <button
          className="btn waves-effect waves-light right-align unveil"
          type="submit"
          onClick={submitHandler}
        >
          1. Roll roll roll!
        </button>
        <button
          className="btn waves-effect waves-light right-align unveil"
          type="submit"
          onClick={() => {
            props.fetchAssignments(props.account.id, props.week)
          }}
        >
          2. Unveil!
        </button>
      </div>

      <div className="trial">
        <div className="user-sections">
          <div>
            <div className="user1-section">
              <h4>User 1</h4>
            </div>
            <div className="user1-section">
              <GoogleTask assignments={props.assignments} userNum={1} />
            </div>
          </div>
          <div>
            <div className="user2-section">
              <h4>User 2</h4>
            </div>
            <div className="user2-section">
              <GoogleTask assignments={props.assignments} userNum={2} />
            </div>
          </div>
        </div>

        {props.assignments[`UserNum: 1`] &&
        props.assignments[`UserNum: 1`].length > 0 ? (
          props.tasks.map(task => {
            let moveDirection = calcClassName(task.name)
            return (
              <div className={`card amber ${moveDirection}`} key={task.name}>
                <div className="card-content white-text">
                  <span className="card-title">{task.name}</span>
                  Total Time: {task.totalTime}
                </div>
              </div>
            )
          })
        ) : (
          <div />
        )}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
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
    console.log('fetching assignment!!!')
    dispatch(fetchAssignments(accountId, week))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ChoreDistribution)
