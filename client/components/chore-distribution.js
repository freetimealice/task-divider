import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {fetchTasks, fetchLatestWeek} from '../store/task'
import {fetchRanks} from '../store/ranking'

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

  const [totalRolls, setTotalRolls] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

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
    [props.week, props.tasks]
  )

  const assignChores = (userNum, task) => {
    setTotalRolls(totalRolls + 1)
    if (totalRolls >= props.tasks.length) {
      alert('All tasks have been asigned')
      return false
    } else {
      const numOfTasks = props.tasks.length
      //calc RandNum
      const randNum = Math.floor(Math.random() * numOfTasks) + 1
      //calc Rank
      let rankingArr = props.ranking[`UserNum: ${userNum}`]
      let ind = rankingArr.findIndex(currTask => currTask.id === task.id)
      let taskRank = props.tasks.length - ind
      //calcTime
      let timeModifier = Math.round(
        numOfTasks * (Math.abs(user1.totalTime - user2.totalTime) / totalTime)
      )
      let userWithTimeModifier = user1.totalTime > user2.totalTime ? 1 : 2
      timeModifier = userNum === userWithTimeModifier ? -timeModifier : 0
      userNum === 1
        ? setUser1({
            ...user1,
            rolled: randNum,
            ranked: taskRank,
            time: timeModifier
          })
        : setUser2({
            ...user2,
            rolled: randNum,
            ranked: taskRank,
            time: timeModifier
          })
      return randNum + taskRank + timeModifier
    }
  }

  const submitHandler = () => {}

  return props.week ? (
    <div className="container">
      <h1 className="center-align"> Which chores will you win?</h1>
      <div className="all-tasks">
        {props.tasks.map(task => {
          return (
            <div className="center-align" key={task.name}>
              Task Name: {task.name} <br />
              Total Time: {task.totalTime}
            </div>
          )
        })}
        <button
          type="submit"
          onClick={async () => {
            const currTask = props.tasks[Math.floor(totalRolls)]
            const user1Points = await assignChores(1, currTask)
            const user2Points = await assignChores(2, currTask)
            let winner = ''
            if (user1Points > user2Points) winner = 1
            else if (user1Points === user2Points) {
              winner = Math.floor(Math.random() * 2) + 1
            } else {
              winner = 2
            }
            winner === 1
              ? await setUser1({
                  ...user1,
                  totalTime: user1.totalTime + currTask.totalTime,
                  tasks: [...user1.tasks, currTask]
                })
              : await setUser2({
                  ...user2,
                  totalTime: user2.totalTime + currTask.totalTime,
                  tasks: [...user2.tasks, currTask]
                })
            console.log('winner', winner)
          }}
        >
          Roll roll roll!
        </button>
      </div>
      <div className="users-container">
        <div className="user1">
          <h3>User 1</h3>
          <p>{`You rolled a ${user1.rolled}`}</p>
          <p>{`You ranked the task a ${user1.ranked}`}</p>
        </div>

        <div className="user2">
          <h3>User 2</h3>
          <p>{`You rolled a ${user2.rolled}`}</p>
          <p>{`You ranked the task a ${user2.ranked}`}</p>
        </div>
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
  week: state.week
})

const mapDispatchToProps = dispatch => ({
  fetchTasks: async (accountId, week) => {
    await dispatch(fetchTasks(accountId, week))
  },
  fetchLatestWeek: async accountId => {
    await dispatch(fetchLatestWeek(accountId))
  },
  fetchRanks: async (accountId, week) => {
    await dispatch(fetchRanks(accountId, week))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ChoreDistribution)
