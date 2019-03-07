import axios from 'axios'

//initial state
const userRanking = {}

//action type
const ADDED_RANK = 'ADDED_RANK'

//action creator
const addedRank = (rankedTaskArr, userNum) => ({
  type: ADDED_RANK,
  userNum,
  rankedTaskArr
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
export default function(state = userRanking, action) {
  switch (action.type) {
    case ADDED_RANK: {
      const newObj = Object.assign({}, state)
      newObj['UserNum: ' + action.userNum] = action.rankedTaskArr
      return newObj
    }
    default:
      return state
  }
}
