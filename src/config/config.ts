export default {
  'development': {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASS,
    'database': process.env.DB_NAME,
    'host': 'localhost',
    'dialect': 'postgres'
  },
  'test': {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASS,
    'database': process.env.DB_NAME,
    'host': 'localhost',
    'dialect': 'postgres'
  },
  'production': {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASS,
    'database': process.env.DB_NAME,
    'host': 'localhost',
    'dialect': 'postgres'
  }
};
