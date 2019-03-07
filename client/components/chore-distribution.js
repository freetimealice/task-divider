import React from 'react'
import {connect} from 'react-redux'
import {fetchTasks, fetchLatestWeek} from '../store/task'

class ChoreDistribution extends React.Component {
  state = {
    fetchedinfo: false
  }

  componentDidMount() {
    if (this.state.fetchedinfo === false && this.props.account) {
      this.props.fetchLatestWeek(this.props.account.id)
    }
  }

  componentDidUpdate() {
    if (this.state.fetchedinfo === false && this.props.account) {
      this.props.fetchTasks(this.props.account.id, this.props.week)
      this.setState({
        fetchedinfo: true
      })
    }
  }

  render() {
    const sortedTasks = this.props.tasks.sort(function(a, b) {
      return b.totalTime - a.totalTime
    })

    return sortedTasks.length ? (
      <div className="container">
        <h1 className="center-align"> Which chores will you win?</h1>
        <div className="all-tasks">
          {sortedTasks.map(task => {
            return (
              <div className="center-align" key={task.name}>
                Task Name: {task.name} <br />
                Total Time: {task.totalTime}
              </div>
            )
          })}
        </div>
        <div className="users-container">
          <div className="user1">
            <h3>User 1</h3>
            />
          </div>

          <div className="user2">
            <h3>User 2</h3>
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
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(ChoreDistribution)
