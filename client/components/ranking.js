import React from 'react'
import {connect} from 'react-redux'
import {addTask, fetchTasks, fetchLatestWeek} from '../store/task'
import {rankTasks} from '../store/ranking'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'

class SortableComponent extends React.Component {
  state = {
    fetchedinfo: false,
    tempOrder: []
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

  onSortEnd = ({oldIndex, newIndex}) => {
    let taskArr = this.state.tempOrder.length
      ? this.state.tempOrder
      : this.props.tasks
    taskArr = arrayMove(taskArr, oldIndex, newIndex)
    this.setState({tempOrder: taskArr})
  }

  submitHandler = event => {
    event.preventDefault()
    let taskArr = this.state.tempOrder.length
      ? this.state.tempOrder
      : this.props.tasks
    this.props.rankTasks(
      taskArr,
      this.props.match.params.userNum,
      this.props.accountId
    )
  }

  render() {
    let taskArr = this.state.tempOrder.length
      ? this.state.tempOrder
      : this.props.tasks
    return (
      <SortableList
        items={taskArr}
        onSortEnd={this.onSortEnd}
        submitHandler={this.submitHandler}
        userNum={this.props.match.params.userNum}
      />
    )
  }
}

const SortableList = SortableContainer(({items, submitHandler, userNum}) => {
  return (
    <div className="container">
      <p>
        User {userNum}, Rank your preference of tasks, with most desired on top,
        and least desired at the bottom.
      </p>
      {Array.isArray(items) ? (
        items.map((task, index) => {
          return (
            <SortableItem key={task.name} index={index} value={task.name} />
          )
        })
      ) : (
        <p>Loading...</p>
      )}
      <button type="submit" onClick={submitHandler}>
        Ranked!
      </button>
    </div>
  )
})

const SortableItem = SortableElement(({value}) => (
  <div className="card-panel teal lighten-5">{value}</div>
))

const mapStateToProps = state => ({
  account: state.account,
  tasks: state.tasks,
  week: state.week
})

const mapDispatchToProps = dispatch => ({
  addTask: task => {
    dispatch(addTask(task))
  },
  fetchTasks: (accountId, week) => {
    dispatch(fetchTasks(accountId, week))
  },
  rankTasks: (taskArr, userNum, accountId) => {
    dispatch(rankTasks(taskArr, userNum, accountId))
  },
  fetchLatestWeek: accountId => {
    dispatch(fetchLatestWeek(accountId))
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(SortableComponent)
