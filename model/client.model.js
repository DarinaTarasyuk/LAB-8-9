// підключення до БД
var connection = require('../config/config.bd')
// функція для створення обєкту
var Client = function(client) {
    this.сlient_ID = client.сlient_ID;
    this.сlient_FIO = client.сlient_FIO;
    this.сlient_passport = client.сlient_passport;
}
//створення нового запису у БД
// newClient - обєкт клієнт зі зіначеннями, що створюються
// result - рузельтат створенняrs
Client.create = function (newClient, result) {
    connection.query ("INSERT INTO client set ?", newClient, function(err, res){
        if (err) {
            console.log("Error:", err);
            result (err,null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId)
        }
    });
}
//пошук за ID 
// ID - значення id клієнта
// result - результат запиту з пошуку
Client.findByID = function (ID, result){
    connection.query("Select * from client where сlient_ID = ?", ID, function(err, res){
        if (err) {
            console.log("Error:", err);
            result (err,null);
        }
        else {
            result(null, res)
        }
    });
};
// Виведення усіх клієнтів з атблиці
Client.findAll = function (result){
    connection.query("Select * from client",function(err, res){
        if (err) {
            console.log("Error:", err);
            result (null,err);
        }
        else {
            console.log("Client: ", res);
            result(null, res)
        }
    });
};
//зміна запису з певним ID у БД
// ID - значення id клієнта
// FIO - значення, що змінюється
// result - результат запиту 
Client.update = function (ID, cl, result){
    connection.query("UPDATE client SET сlient_FIO=?, сlient_passport=? WHERE сlient_ID=?", [cl.сlient_FIO, cl.сlient_passport, ID],
    function(err, res){
        if (err) {
            console.log("Error:", err);
            result (null,err);
        }
        else {
            result(null, res)
        }
    });
};
// видалення запису з певним ID у БД
// ID - значення id клієнта
// result - результат запиту 
Client.delete = function (ID, result){
    connection.query("DELETE FROM client WHERE сlient_ID=?", [ID],
    function(err, res){
        if (err) {
            console.log("Error:", err);
            result (null,err);
        }
        else {
            result(null, res)
        }
    });
};
// вказуємо, що експорт з модуля Client
module.exports = Client;
