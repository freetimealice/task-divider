import React from 'react'
import {connect} from 'react-redux'
import {fetchTasks, fetchLatestWeek} from '../store/task'
import {fetchRanks} from '../store/ranking'

class ChoreDistribution extends React.Component {
  state = {
    fetchedinfo: false,
    totalRolls: 0,
    user1: {
      totalTime: 0,
      tasks: [],
      rolled: 0,
      ranked: 0
    },
    user2: {
      totalTime: 0,
      tasks: [],
      rolled: 0,
      ranked: 0
    },
    totalTime: 0
  }

  componentDidMount() {
    if (this.state.fetchedinfo === false && this.props.account) {
      this.props.fetchLatestWeek(this.props.account.id)
    }
  }

  async componentDidUpdate() {
    if (this.state.fetchedinfo === false && this.props.account) {
      await this.props.fetchTasks(this.props.account.id, this.props.week)
      await this.props.fetchRanks(this.props.account.id, this.props.week)
      await this.setState({
        fetchedinfo: true
      })
    }
  }

  calculateRandomInt = async userNum => {
    const numOfTasks = this.props.tasks.length
    const num = Math.floor(Math.random() * numOfTasks) + 1
    //update rolled num
    await this.setState(state => {
      return {[`user${userNum}`]: {...state[`user${userNum}`], rolled: num}}
    })
    //update totalRolls
    await this.setState(state => {
      return {totalRolls: state.totalRolls + 0.5}
    })
  }

  calculateRank = async (userNum, task) => {
    let rankingArr = this.props.ranking[`UserNum: ${userNum}`]
    let ind = rankingArr.findIndex(currTask => {
      return currTask.id === task.id
    })
    let taskRank = this.props.tasks.length - ind
    await this.setState(state => {
      return {
        [`user${userNum}`]: {...state[`user${userNum}`], ranked: taskRank}
      }
    })
  }

  assignChores = async userNum => {
    if (this.state.totalRolls >= this.props.tasks.length) {
      alert('All tasks have been asigned')
      return false
    } else {
      const task = this.props.tasks[this.state.totalRolls]
      await this.calculateRandomInt(userNum)
      await this.calculateRank(userNum, task)
    }
  }

  render() {
    return this.props.tasks.length ? (
      <div className="container">
        <h1 className="center-align"> Which chores will you win?</h1>
        <div className="all-tasks">
          {this.props.tasks.map(task => {
            return (
              <div className="center-align" key={task.name}>
                Task Name: {task.name} <br />
                Total Time: {task.totalTime}
              </div>
            )
          })}
          <button
            type="submit"
            onClick={() => {
              this.assignChores(1)
              this.assignChores(2)
            }}
          >
            Roll roll roll!
          </button>
        </div>
        <div className="users-container">
          <div className="user1">
            <h3>User 1</h3>
            <p>{`You rolled a ${this.state.user1.rolled}`}</p>
            <p>{`You ranked the task a ${this.state.user1.ranked}`}</p>
          </div>

          <div className="user2">
            <h3>User 2</h3>
            <p>{`You rolled a ${this.state.user2.rolled}`}</p>
            <p>{`You ranked the task a ${this.state.user2.ranked}`}</p>
          </div>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account,
  tasks: state.tasks,
  ranking: state.ranking,
  week: state.week
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
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ChoreDistribution)
