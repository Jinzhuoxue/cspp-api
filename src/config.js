const config = {
  APP_NAME: 'CSAPP-API',

  DB_TABLE: {
    newsletter : 'newsletter'
  },

  KNEX: {
    dev: {
      client: 'pg',
      connection: process.env.DATABASE_URL ||'postgres://localhost:5432/restapi'
    },
    test: {
      client: 'pg',
      connection: process.env.DATABASE_URL ||'postgres://localhost:5432/restapi'
    },
    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL + '?ssl=true'
    }
  }

}

export default config;
