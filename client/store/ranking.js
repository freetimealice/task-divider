import axios from 'axios'

//initial state
const userRanking = {}
const defaultassignments = {}

//action type
const ADDED_RANK = 'ADDED_RANK'
const FETCHED_RANKS = 'FETCH_RANKS'
const GOT_ASSIGNMENTS = 'GOT_ASSIGNMENTS'
const CLEAR_ASSIGNMENTS = 'CLEAR_ASSIGNMENTS'
//action creator

const addedRank = (rankedTaskArr, userNum) => ({
  type: ADDED_RANK,
  userNum,
  rankedTaskArr
})

const fetchedRanks = rankedTaskArrs => ({
  type: FETCHED_RANKS,
  rankedTaskArrs
})

export const clearAssignments = () => ({
  type: CLEAR_ASSIGNMENTS
})

const gotAssignments = assignments => ({
  type: GOT_ASSIGNMENTS,
  assignments
})
export const rankTasks = (rankedTaskArr, userNum, accountId, history) => {
  return async dispatch => {
    try {
      await axios.post(`/api/tasks/rank/${userNum}/`, {rankedTaskArr})
      dispatch(addedRank(rankedTaskArr, userNum))
      userNum === '1'
        ? history.push(`/ranking/2`)
        : history.push(`/chore-distribution`)
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchRanks = (accountId, week) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/tasks/rank/${accountId}/${week}`)
      dispatch(fetchedRanks(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const saveAssignment = (taskId, winnerUserNum) => {
  return async () => {
    try {
      await axios.put(`/api/tasks/rank/${taskId}/${winnerUserNum}`)
    } catch (err) {
      console.error(err)
    }
  }
}

export const fetchAssignments = (accountId, week) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(
        `/api/tasks/responsibilities/${accountId}/${week}`
      )
      dispatch(gotAssignments(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export default function(state = userRanking, action) {
  switch (action.type) {
    case ADDED_RANK: {
      const newObj = Object.assign({}, state)
      newObj['UserNum: ' + action.userNum] = action.rankedTaskArr
      return newObj
    }
    case FETCHED_RANKS: {
      return action.rankedTaskArrs
    }
    default:
      return state
  }
}

export const assignments = (state = defaultassignments, action) => {
  switch (action.type) {
    case GOT_ASSIGNMENTS:
      return action.assignments
    case CLEAR_ASSIGNMENTS:
      return defaultassignments
    default:
      return state
  }
}
