const config = {
  APP_NAME: 'Orsay-Magento',

  DB_TABLE: {
    newsletter : 'salesforce.account'
  },

  KNEX: {
    dev: {
      client: 'pg',
      connection: process.env.DATABASE_URL ||'postgres://tbzkxuquammqda:cb32b0a359eddcbeeb91ffae2d18bb9c805890670bf7a2f3917fa442684d2250@ec2-54-247-123-130.eu-west-1.compute.amazonaws.com:5432/d7ilh6gtkok2mi?ssl=true'
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
