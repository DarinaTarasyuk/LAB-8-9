// !Додаємо для виведення
const express = require('express')
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);

const Order = require("../model/orders.model");
// на вході кожного методу буде запит, записаний у req. 
// на виході результат, отриманий від моделі, інфа про помилки
// i error:false якщо помилок немає у форматі json

// Виведення усіх клієнтів з атблиці
exports.findAll = function (req, res){
    Order.findAll(function (err, orders){
        console.log("controller");
        if (err)  
             res.send(err);
        //res.send(orders);
        //зєднання з файлом виведення
        res.render('orders.ejs', {Order:orders});
        
    });
};

//створення нового запису у БД
exports.create = function (req, res) {
    const new_order = new Order(req.body);
    //handles null err
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message:"Please provide all required field"});
    } else {
        Order.create(new_order, function(err, orders){
            if (err)  res.send(err);
            //res.json({error:false,message:"Order added successfully", data:orders });
            // перехід на таблицю
             res.redirect('/api/orders');
        });
    }
};

//пошук за ID 
exports.findByID = function (req, res){
    Order.findByID(req.params.ID, function (err, orders){
        if (err)  res.send(err);
            //res.json(orders);
             // перехід на сторінку редагування
             res.render('orders_edit.ejs', {Order:orders});
    });
};

//зміна запису з певним ID у БД
exports.update = function (req, res){
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message:"Please provide all required field"});
    } else {
        Order.update (req.params.ID, new Order(req.body),function(err, orders){
            if (err)  res.send(err);
            //res.json({error:false,message:"Order updated successfully"});
            // перехід на таблицю
            res.redirect('/api/orders');
        });
    }
};
// видалення запису з певним ID у БД
// ID - значення id клієнта
// result - результат запиту 
exports.delete = function (req, res){
    Order.delete(req.params.ID,function(err, orders){
        console.log("HI" + req.params.ID)
        if (err)  
            res.send(err);
        //res.json({error:false,message:"Order deleted successfully"});
        // перехід на таблицю
        res.redirect('/api/orders');
    });
};