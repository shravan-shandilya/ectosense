export const config = {
  APP: {
    SALT_ROUNDS: 10,
  },
  MONGO: {
    URL: "mongodb+srv://ectosense:!P5$9BzFjYXUtGZ@cluster0-myjqb.mongodb.net",
    DATABASE: "ectosense",
    POOL_SIZE: 20,
  },
  ACCESS_TOKEN: {
    SECRET: "hello",
    EXPIRY: "1y",
  },
};
