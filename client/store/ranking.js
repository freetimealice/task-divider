import axios from 'axios'

//initial state
const userRanking = {}
const defaultassignments = {}

//action type
const ADDED_RANK = 'ADDED_RANK'
const FETCHED_RANKS = 'FETCH_RANKS'
const GOT_ASSIGNMENTS = 'GOT_ASSIGNMENTS'
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

const gotAssignments = assignments => ({
  type: GOT_ASSIGNMENTS,
  assignments
})
export const rankTasks = (rankedTaskArr, userNum) => {
  return async dispatch => {
    try {
      await axios.post(`/api/tasks/rank/${userNum}/`, {rankedTaskArr})
      dispatch(addedRank(rankedTaskArr, userNum))
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
      console.log('assignments reducer', action.assignments)
      return action.assignments
    default:
      return state
  }
}
