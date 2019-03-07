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
      rolled: 0
    },
    user2: {
      totalTime: 0,
      tasks: [],
      rolled: 0
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
      // const totalTime = this.props.tasks.reduce((totalT, currTask) => {
      //   return (currTask.totalTime + totalT)
      // }, 0)
      // await this.setState({totalTime})
      console.log('this.props', this.props)
    }
  }

  calculateRandomInt = async userNum => {
    if (this.state.totalRolls >= this.props.tasks.length) {
      alert('All tasks have been asigned')
      return
    }

    const numOfTasks = this.props.tasks.length
    const taskToAssign = this.props.tasks[this.state.totalRolls]
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
              this.calculateRandomInt(1)
              this.calculateRandomInt(2)
            }}
          >
            Roll roll roll!
          </button>
        </div>
        <div className="users-container">
          <div className="user1">
            <h3>User 1</h3>
            <p>{`You rolled a ${this.state.user1.rolled}`}</p>
          </div>

          <div className="user2">
            <h3>User 2</h3>
            <p>{`You rolled a ${this.state.user2.rolled}`}</p>
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
    console.log('fetchingRanks')
    console.log('accountId', accountId)
    console.log('week', week)
    dispatch(fetchRanks(accountId, week))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ChoreDistribution)
