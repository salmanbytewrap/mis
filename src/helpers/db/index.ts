import config from "../../config/Config";

const mysql = require("mysql2");
var connection = mysql.createConnection({
    host: config.DBHOST,
    user: config.DBUSER,
    password: config.DBPASSWORD,
    database: config.DBNAME
});
export default connection;
