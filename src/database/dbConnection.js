const mysql = require('mysql');

module.exports = () =>{
    return mysql.createConnection({
        host: 'us-cdbr-east-02.cleardb.com',
        user: 'be13628b6256e3',
        password: '6208b928',
        database: 'heroku_ac7a39123dbe9af'
    })
}