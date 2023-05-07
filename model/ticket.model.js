// підключення до БД
var connection = require('../config/config.bd')
// функція для створення обєкту
var Ticket = function(ticket) {
    this.ticket_ID = ticket.ticket_ID;
    this.order_ID = ticket.order_ID;
    this.train_ID = ticket.train_ID;
    this.carriage_num = ticket.carriage_num;
    this.seat_num = ticket.seat_num;
    this.shipment_date = ticket.shipment_date;
    this.arrival_date = ticket.arrival_date;
    this.additional_document = ticket.additional_document;
    this.price = ticket.price;
}
//створення нового запису у БД
// newTicket - обєкт квиток зі зіначеннями, що створюються
// result - результат створення
Ticket.create = function (newTicket, result) {
    connection.query ("INSERT INTO ticket set ?", newTicket, function(err, res){
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
// ID - значення id квитка
// result - результат запиту з пошуку
Ticket.findByID = function (ID, result){
    connection.query("Select * from ticket where ticket_ID = ?", ID, function(err, res){
        if (err) {
            console.log("Error:", err);
            result (err,null);
        }
        else {
            result(null, res)
        }
    });
};
// Виведення усіх квитків з атблиці
Ticket.findAll = function (result){
    connection.query("Select * from ticket",function(err, res){
        if (err) {
            console.log("Error:", err);
            result (null,err);
        }
        else {
            console.log("Ticket: ", res);
            result(null, res)
        }
    });
};
//зміна запису з певним ID у БД
// ID - значення id квитка
// значення, що змінюється
// result - результат запиту 
Ticket.update = function (ID, tckt, result){
    connection.query("UPDATE ticket SET order_ID=?,train_ID=?,carriage_num=?,seat_num=?,shipment_date=?,arrival_date=?,additional_document=?,price=? WHERE ticket_ID=?",
    [tckt.order_ID, tckt.train_ID, tckt.carriage_num, tckt.seat_num, tckt.shipment_date, tckt.arrival_date, tckt.additional_document, tckt.price, ID],
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
Ticket.delete = function (ID, result){
    connection.query("DELETE FROM ticket WHERE ticket_ID=?", [ID],
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
module.exports = Ticket;
