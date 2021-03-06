import React from 'react'
import {connect} from 'react-redux'
import {addTask, fetchTasks, deleteTask, fetchLatestWeek} from '../store/task'
import {clearAssignments} from '../store/ranking'

class AddTasks extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      renderAgain: false
    }
  }

  componentDidMount() {
    this.props.clearAssignments()
    if (this.props.account.id) {
      this.props.fetchLatestWeek(this.props.account.id)
    }
  }

  componentDidUpdate() {
    if (this.state.renderAgain) {
      this.props.fetchTasks(this.props.account.id, this.state.value)
      this.setState({renderAgain: false})
    }
    if (this.props.account.id && !this.props.week) {
      this.props.fetchLatestWeek(this.props.account.id)
    }
  }

  deleteHandler = (event, accountId, taskId) => {
    event.preventDefault()
    this.props.deleteTask(accountId, taskId)
  }

  handleChange = event => {
    this.setState({renderAgain: true})
    this.setState({value: Number(event.target.value)})
  }

  submitHandler = event => {
    event.preventDefault()

    const week = event.target.week.value
    const name = event.target.name.value
    const notes = event.target.notes.value
    const duration = event.target.duration.value
    const frequency = event.target.freq.value
    const accountId = this.props.account.id
    const task = {week, name, notes, duration, frequency, accountId}
    this.props.addTask(task)
  }

  nextPageHandler = event => {
    event.preventDefault()
    this.props.history.push(`/ranking/1`)
  }

  render() {
    const {tasks} = this.props
    return (
      <div className="container">
        <form onSubmit={this.submitHandler}>
          {this.props.week ? <div>Last Week: {this.props.week} </div> : <div />}
          <div>
            <label htmlFor="week">Week: </label>
            <input
              type="text"
              name="week"
              defaultValue={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="name">Name: </label>
            <input name="name" defaultValue="wash dishes" />
          </div>
          <div>
            <label htmlFor="notes">Notes: </label>
            <input name="notes" defaultValue="use organic soap" />
          </div>
          <div>
            <label htmlFor="duration">Est Duration (Mins): </label>
            <input name="duration" defaultValue="50" />
          </div>
          <div>
            <label htmlFor="freq">Frequency / week: </label>
            <input name="freq" defaultValue="1" />
          </div>
          <button type="submit">ADD TASK</button>
        </form>
        <button
          className="btn waves-effect waves-light right-align"
          type="submit"
          onClick={this.nextPageHandler}
          name="action"
        >
          Ready to Rank!
        </button>

        <div className="allTasks">
          {tasks.map(task => {
            const {name, frequency, notes, duration, totalTime} = task
            const taskId = task.id
            const accountId = this.props.account.id
            return (
              <div key={name} className="col s12 m6">
                <div className="card-panel teal lighten-5">
                  <p>Name: {name}</p>
                  <p>Frequency: {frequency}</p>
                  <p>Notes: {notes}</p>
                  <p>Time / task: {duration}</p>
                  <p>Total Time: {totalTime}</p>
                  <a
                    className="waves-effect waves-light btn"
                    onClick={() => this.deleteHandler(event, accountId, taskId)}
                  >
                    Delete
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  account: state.account,
  tasks: state.tasks,
  week: state.week,
  assignments: state.assignments
})

const mapDispatchToProps = dispatch => ({
  addTask: task => {
    dispatch(addTask(task))
  },
  fetchLatestWeek: accountId => {
    dispatch(fetchLatestWeek(accountId))
  },
  fetchTasks: (accountId, week) => {
    dispatch(fetchTasks(accountId, week))
  },
  deleteTask: (accountId, taskId) => {
    dispatch(deleteTask(accountId, taskId))
  },
  clearAssignments: () => {
    console.log('clearing assignments')
    dispatch(clearAssignments())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTasks)
