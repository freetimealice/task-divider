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

    const lastestWeek = allTasks.reduce((latestWeek, currTask) => {
      return currTask.week > latestWeek ? currTask.week : latestWeek
    }, 0)
    res.json(lastestWeek)
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
        taskName: task.name
      })
    })

    res.json(ranking)
  } catch (err) {
    next(err)
  }
})
