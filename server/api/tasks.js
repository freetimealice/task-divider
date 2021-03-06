const router = require('express').Router()
const {Task, Responsibilities, User} = require('../db/models')
module.exports = router

router.get('/latestweek/:accountId', async (req, res, next) => {
  try {
    const allTasks = await Task.findAll({
      where: {
        accountId: req.params.accountId
      }
    })

    let lastestWeek = allTasks.reduce((latestWeek, currTask) => {
      return currTask.week > latestWeek ? currTask.week : latestWeek
    }, 0)
    if (lastestWeek === 0) lastestWeek = 'N/A'
    res.json(lastestWeek)
  } catch (err) {
    next(err)
  }
})

router.get('/rank/:accountId/:week', async (req, res, next) => {
  try {
    const {week, accountId} = req.params
    const rankings = await Responsibilities.findAll({
      where: {
        week,
        accountId
      },
      attributes: ['userNum', 'ranking', 'taskId']
    })

    let jsonResult = {}

    const getTaskByOrder = async userNum => {
      let userRankings = rankings
        .filter(obj => obj.userNum === userNum)
        .sort((a, b) => a.ranking > b.ranking)

      let result = []

      for (let i = 0; i < userRankings.length; i++) {
        let currTaskId = userRankings[i].taskId
        let taskDetails = await Task.findById(currTaskId)
        result.push(taskDetails)
      }
      return result
    }
    jsonResult['UserNum: 1'] = await getTaskByOrder(1)
    jsonResult['UserNum: 2'] = await getTaskByOrder(2)

    res.json(jsonResult)
  } catch (err) {
    next(err)
  }
})

router.get('/responsibilities/:accountId/:week', async (req, res, next) => {
  try {
    let allResponsibilities = ''
    if (req.params.week !== '0') {
      allResponsibilities = await Responsibilities.findAll({
        where: {
          accountId: req.params.accountId,
          week: req.params.week
        }
      })
    } else {
      allResponsibilities = await Responsibilities.findAll({
        where: {
          accountId: req.params.accountId
        }
      })
    }

    let jsonResult = {}

    const getTaskByDetails = async userNum => {
      let userResponsibilities = allResponsibilities.filter(
        obj => obj.won === userNum
      )

      let result = []

      for (let i = 0; i < userResponsibilities.length; i++) {
        let currTaskId = userResponsibilities[i].taskId
        let taskDetails = await Task.findById(currTaskId)
        result.push(taskDetails)
      }
      return result
    }

    jsonResult['UserNum: 1'] = await getTaskByDetails(1)
    jsonResult['UserNum: 2'] = await getTaskByDetails(2)

    res.json(jsonResult)
  } catch (err) {
    next(err)
  }
})

router.get('/:accountId/:week', async (req, res, next) => {
  try {
    const allTasks = await Task.findAll({
      where: {
        accountId: req.params.accountId,
        week: req.params.week
      }
    })
    res.json(allTasks)
  } catch (err) {
    next(err)
  }
})

router.delete('/:accountId/:taskId', async (req, res, next) => {
  try {
    const deleteTask = await Task.destroy({
      where: {
        accountId: req.params.accountId,
        id: req.params.taskId
      }
    })
    res.json(deleteTask)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {frequency, duration} = req.body.task
    const newTask = await Task.create({
      ...req.body.task,
      totalTime: frequency * duration
    })
    res.json(newTask)
  } catch (err) {
    next(err)
  }
})

router.post('/rank/:userNum', async (req, res, next) => {
  try {
    const {rankedTaskArr} = req.body
    const {userNum} = req.params
    const user = await User.findOne({
      where: {
        accountId: rankedTaskArr[0].accountId,
        userNum
      }
    })
    const ranking = rankedTaskArr.map(async (task, ind) => {
      const newRanking = await Responsibilities.create({
        taskId: task.id,
        userId: user.id,
        accountId: task.accountId,
        ranking: rankedTaskArr.length - ind,
        taskName: task.name,
        userNum: userNum,
        week: rankedTaskArr[0].week
      })
    })

    res.json(ranking)
  } catch (err) {
    next(err)
  }
})
router.put('/rank/:taskId/:winnerUserNum', async (req, res, next) => {
  try {
    const {taskId, winnerUserNum} = req.params
    const currTask = await Responsibilities.findOne({
      where: {
        taskId: taskId,
        userNum: winnerUserNum
      }
    })
    currTask.update({won: winnerUserNum})
    res.json(200)
  } catch (err) {
    next(err)
  }
})
