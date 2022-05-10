module.exports = {
  api: {
    port: process.env.PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "notasecret!",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "remotemysql.com",
    user: process.env.MYSQL_USER || "iiyVHlc2NU",
    password: process.env.MYSQL_PASSWORD || "4kUV6wgiYV",
    database: process.env.MYSQL_DATABASE || "iiyVHlc2NU",
  },
};
