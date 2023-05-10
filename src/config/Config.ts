type env = {
  PORT: Number;
  NODE_ENV: string;
  JWTSECRET: string;
  ISSUER: string;
  DBHOST: string;
  DBUSER: string;
  DBPASSWORD: string;
  DBNAME: string;

};

export const config: env = {
  PORT: parseInt(process.env.PORT) || 8080,
  NODE_ENV: process.env.NODE_ENV,
  JWTSECRET: process.env.JWTSECRET,
  ISSUER: process.env.ISSUER,
  DBHOST: process.env.DBHOST,
  DBUSER: process.env.DBUSER,
  DBPASSWORD: process.env.DBPASSWORD,
  DBNAME: process.env.DBNAME,
};
export default config;
