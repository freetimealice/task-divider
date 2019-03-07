import axios from 'axios'

//initial state
const allTasks = []
const currWeek = ''

//action type
const ADDED_TASK = 'ADDED_TASK'
const GOT_TASKS = 'GOT_TASKS'
const DELETED_TASK = 'DELETED_TASK'
const LATEST_WEEK = 'LATEST_WEEK'

//action creator
const addedTask = task => ({type: ADDED_TASK, task})
const gotTasks = tasks => ({type: GOT_TASKS, tasks})
const deletedTask = taskId => ({type: DELETED_TASK, taskId})
const latestWeek = week => {
  return {type: LATEST_WEEK, week}
}

//thunk creator
export const addTask = task => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/tasks', {task})
      dispatch(addedTask(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchLatestWeek = accountId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/tasks/latestweek/${accountId}`)
      dispatch(latestWeek(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchTasks = (accountId, week) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/tasks/${accountId}/${week}`)
      const sortedTasks = data.sort(function(a, b) {
        return b.totalTime - a.totalTime
      })
      dispatch(gotTasks(sortedTasks))
      dispatch(fetchLatestWeek(accountId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteTask = (accountId, taskId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/tasks/${accountId}/${taskId}`)
      dispatch(deletedTask(taskId))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = allTasks, action) {
  switch (action.type) {
    case ADDED_TASK:
      return [...state, action.task]
    case GOT_TASKS:
      return action.tasks
    case DELETED_TASK:
      return state.filter(task => {
        return task.id !== action.taskId
      })
    default:
      return state
  }
}

export const week = (state = currWeek, action) => {
  switch (action.type) {
    case LATEST_WEEK:
      return action.week
    default:
      return state
  }
}
