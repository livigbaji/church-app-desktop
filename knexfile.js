module.exports = {
  development: {
    client: 'better-sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: "./dev.sqlite3",
    },
    migrations: {
      directory: './src/main/migrations'
    }
  },
};
