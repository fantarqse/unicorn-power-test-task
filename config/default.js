module.exports = {
  port: process.env.PORT,
  db: {
    schema: process.env.DB_SCHEMA || 'public',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dropSchema: false,
  }
}
