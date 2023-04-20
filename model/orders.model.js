// підключення до БД
var connection = require('../config/config.bd')
// функція для створення обєкту
var Order = function(orders) {
    this.order_ID = orders.order_ID;
    this.client_ID = orders.client_ID;
    this.service_list = orders.service_list;
   
}
//створення нового запису у БД
// newOrder - обєкт замовлення зі значеннями, що створюються
// result - результат створення
Order.create = function (newOrder, result) {
    connection.query ("INSERT INTO orders set ?", newOrder, function(err, res){
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
// ID - значення id замовлення
// result - результат запиту з пошуку
Order.findByID = function (ID, result){
    connection.query("Select * from orders where order_ID = ?", ID, function(err, res){
        if (err) {
            console.log("Error:", err);
            result (err,null);
        }
        else {
            result(null, res)
        }
    });
};
// Виведення усіх замовлень з таблиці
Order.findAll = function (result){
    connection.query("Select * from orders",function(err, res){
        if (err) {
            console.log("Error:", err);
            result (null,err);
        }
        else {
            console.log("Orders: ", res);
            result(null, res)
        }
    });
};
//зміна запису з певним ID у БД
// ID - значення id замовлення
// ord - значення, що змінюється
// result - результат запиту 
Order.update = function (ID, ord, result){
    connection.query("UPDATE orders SET client_ID=?, service_list=? WHERE order_ID=?", [ord.client_ID, ord.service_list, ID],
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
// ID - значення id замовлення
// result - результат запиту 
Order.delete = function (ID, result){
    connection.query("DELETE FROM orders WHERE order_ID=?", [ID],
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
// вказуємо, що експорт з модуля Order
module.exports = Order;
