const mysql = require('mysql');
//ств нове зєднання на локальному хості з вказанимим параметрами
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database: 'railway_tickets'
});
//зєднання з БДrs
connection.connect(function(err){
    if (!err){
        console.log("DB is connected");
    } else {
        console.log("Error while connecting with DB");
    }
});
//експорт зєднання
module.exports = connection;