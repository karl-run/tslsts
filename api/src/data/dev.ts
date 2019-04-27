import knex from 'knex'

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite',
  },
  useNullAsDefault: true,
})

module.exports = db
