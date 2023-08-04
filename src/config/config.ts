export default () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  DB_PORT: parseInt(process.env.DB_PORT, 10) || 3000,
  DB_HOST: process.env.DB_HOST,
});
