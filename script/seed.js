'use strict'

const db = require('../server/db')
const {Account, User, Task, Responsibilities} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const accounts = await Promise.all([
    Account.create({name: 'Cody', password: '123'}),
    Account.create({name: 'Murphy', password: '123'})
  ])

  const users = await Promise.all([
    User.create({userName: 'Alice', userNum: 1, accountId: 1}),
    User.create({userName: 'Bran', userNum: 2, accountId: 1})
  ])

  const tasks = await Promise.all([
    Task.create({
      name: 'Vacuum',
      week: '1',
      complete: 'false',
      notes: 'Bedroom twice',
      frequency: '1',
      duration: '60',
      totalTime: '60',
      accountId: '1'
    }),
    Task.create({
      name: 'Wash dishes',
      week: '1',
      complete: 'false',
      frequency: '7',
      duration: '15',
      totalTime: '105',
      accountId: '1'
    }),
    Task.create({
      name: 'Dry and put away dishes',
      week: '1',
      complete: 'false',
      notes: "Don't break ceramics",
      frequency: '7',
      duration: '15',
      totalTime: '105',
      accountId: '1'
    }),
    Task.create({
      name: 'Feed Bobo',
      week: '1',
      complete: 'false',
      notes: 'Organic food only',
      frequency: '7',
      duration: '5',
      totalTime: '35',
      accountId: '1'
    }),
    Task.create({
      name: 'Pickup Jimmy',
      week: '1',
      complete: 'false',
      notes: 'from Kindergarten',
      frequency: '5',
      duration: '40',
      totalTime: '200',
      accountId: '1'
    }),
    Task.create({
      name: 'Drive mom to doctor',
      week: '1',
      complete: 'false',
      notes: 'at 101 Nowhereville',
      frequency: '1',
      duration: '60',
      totalTime: '60',
      accountId: '1'
    }),
    Task.create({
      name: 'Wash bedding',
      week: '1',
      complete: 'false',
      frequency: '1',
      duration: '5',
      totalTime: '5',
      accountId: '1'
    }),
    Task.create({
      name: 'Water plants',
      week: '1',
      complete: 'false',
      notes: 'Needs more sun!!',
      frequency: '3',
      duration: '5',
      totalTime: '15',
      accountId: '1'
    }),
    Task.create({
      name: 'Take out the trash',
      week: '1',
      complete: 'false',
      frequency: '2',
      duration: '5',
      totalTime: '10',
      accountId: '1'
    }),
    Task.create({
      name: 'Wash toilet',
      week: '1',
      complete: 'false',
      frequency: '1',
      duration: '20',
      totalTime: '20',
      accountId: '1'
    })
  ])
  // const responsibilities = await Promise.all([
  //   Responsibilities.create({ranking: '7', taskName: 'Vacuum', week: '1', userNum: '1', accountId: '1', won: '1', userId: '1', taskId: '11'}),
  //   Responsibilities.create({ranking: '10', taskName: 'Wash dishes', week: '1', userNum: '1', accountId: '1', won: '', userId: '1', taskId: '12'}),
  //   Responsibilities.create({ranking: '9', taskName: 'Dry and put away dishes', week: '1', userNum: '1', accountId: '1', won: '1', userId: '1', taskId: '13'}),
  //   Responsibilities.create({ranking: '5', taskName: 'Feed Bobo', week: '1', userNum: '1', accountId: '1', won: '', userId: '1', taskId: '14'}),
  //   Responsibilities.create({ranking: '6', taskName: 'Pickup Jimmy', week: '1', userNum: '1', accountId: '1', won: '1', userId: '1', taskId: '15'}),
  //   Responsibilities.create({ranking: '8', taskName: 'Drive mom to doctor', week: '1', userNum: '1', accountId: '1', won: '', userId: '1', taskId: '16'}),
  //   Responsibilities.create({ranking: '1', taskName: 'Wash bedding', week: '1', userNum: '1', accountId: '1', won: '1', userId: '1', taskId: '17'}),
  //   Responsibilities.create({ranking: '3', taskName: 'Water plants', week: '1', userNum: '1', accountId: '1', won: '', userId: '1', taskId: '18'}),
  //   Responsibilities.create({ranking: '2', taskName: 'Take out the trash', week: '1', userNum: '1', accountId: '1', won: '', userId: '1', taskId: '19'}),
  //   Responsibilities.create({ranking: '4', taskName: 'Wash toilet', week: '1', userNum: '1', accountId: '1', won: '', userId: '1', taskId: '20'}),
  //   Responsibilities.create({ranking: '7', taskName: 'Vacuum', week: '1', userNum: '2', accountId: '1', won: '', userId: '2', taskId: '11'}),
  //   Responsibilities.create({ranking: '10', taskName: 'Wash dishes', week: '1', userNum: '2', accountId: '1', won: '2', userId: '2', taskId: '12'}),
  //   Responsibilities.create({ranking: '9', taskName: 'Dry and put away dishes', week: '1', userNum: '2', accountId: '1', won: '', userId: '2', taskId: '13'}),
  //   Responsibilities.create({ranking: '6', taskName: 'Feed Bobo', week: '1', userNum: '2', accountId: '1', won: '2', userId: '2', taskId: '14'}),
  //   Responsibilities.create({ranking: '2', taskName: 'Pickup Jimmy', week: '1', userNum: '2', accountId: '1', won: '', userId: '2', taskId: '15'}),
  //   Responsibilities.create({ranking: '8', taskName: 'Drive mom to doctor', week: '1', userNum: '2', accountId: '1', won: '2', userId: '2', taskId: '16'}),
  //   Responsibilities.create({ranking: '1', taskName: 'Wash bedding', week: '1', userNum: '2', accountId: '1', won: '', userId: '2', taskId: '17'}),
  //   Responsibilities.create({ranking: '4', taskName: 'Water plants', week: '1', userNum: '2', accountId: '1', won: '2', userId: '2', taskId: '18'}),
  //   Responsibilities.create({ranking: '3', taskName: 'Take out the trash', week: '1', userNum: '2', accountId: '1', won: '2', userId: '2', taskId: '19'}),
  //   Responsibilities.create({ranking: '5', taskName: 'Wash toilet', week: '1', userNum: '2', accountId: '1', won: '2', userId: '2', taskId: '20'}),
  // ])
  console.log(`seeded ${accounts.length} accounts`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
