import axios from 'axios'

//initial state
const userRanking = {}

//action type
const ADDED_RANK = 'ADDED_RANK'
const FETCHED_RANKS = 'FETCH_RANKS'
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
