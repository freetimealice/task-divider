'use strict'

const db = require('../server/db')
const {Account, User, Task} = require('../server/db/models')

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
      name: 'Toilet',
      week: 1,
      complete: false,
      notes: 'clean the rim!',
      frequency: 3,
      duration: 30,
      totalTime: 90,
      accountId: 1
    }),
    Task.create({
      name: 'Dishes',
      week: 1,
      complete: false,
      notes: 'use organic soap',
      frequency: 1,
      duration: 20,
      totalTime: 20,
      accountId: 1
    }),
    Task.create({
      name: 'Garbage',
      week: 1,
      complete: false,
      notes: 'remember to wash hands',
      frequency: 1,
      duration: 20,
      totalTime: 20,
      accountId: 1
    }),
    Task.create({
      name: 'Pickup kids',
      week: 1,
      complete: false,
      notes: 'Little Jimmy from Kindergarten at 3pm',
      frequency: 1,
      duration: 20,
      totalTime: 20,
      accountId: 1
    })
  ])

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
