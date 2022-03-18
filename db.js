const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'luke.czoboriek',
    password: 'password',
    port: 5432
})

client.connect(function(err) {
    if(err) throw err
});

module.exports = client;