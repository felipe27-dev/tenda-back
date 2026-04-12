import "dotenv/config";

export const config = {
  mode: process.env.NODE_ENV || "development",

  secret: "42938423094u204ut4",
  port: Number(process.env.PORT) || 3000,

  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "postgres",
    storage: process.env.DB_STORAGE || "./database.sqlite",
  },

  mail: {
    host: process.env.SMTP_HOST || "smtp.mailtrap.io",
    port: Number(process.env.SMTP_PORT) || 2525,
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.EMAIL_FROM || "",
  },
};
