import config   from '../config'
import knex     from 'knex'

export const db = knex(config.KNEX[process.env.NODE_ENV || 'dev'])
