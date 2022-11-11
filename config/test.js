module.exports = {
  port: process.env.PORT,
  db: {
    schema: process.env.TEST_DB_SCHEMA || 'public',
    host: process.env.TEST_DB_HOST,
    user: process.env.TEST_DB_USER,
    name: process.env.TEST_DB_NAME,
    password: process.env.TEST_DB_PASSWORD,
    port: process.env.TEST_DB_PORT,
    dropSchema: true,
  }
}
