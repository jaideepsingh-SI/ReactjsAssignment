const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "Sportz@2023",
    host: "localhost",
    port:5432,
    database: "postgres",
});

module.exports = pool;