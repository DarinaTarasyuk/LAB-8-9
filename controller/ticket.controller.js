// !Додаємо для виведення
const express = require('express')
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);

const Ticket = require("../model/ticket.model");
// на вході кожного методу буде запит, записаний у req. 
// на виході результат, отриманий від моделі, інфа про помилки
// i error:false якщо помилок немає у форматі json


// Виведення усіх квитків з атблиці
exports.findAll = function (req, res){
    Ticket.findAll(function (err, ticket){
        console.log("controller");
        if (err)  
             res.send(err);
        //res.send(ticket);
        //зєднання з файлом виведення
        res.render('ticket.ejs', {Ticket:ticket});
    });
};

//створення нового запису у БД
exports.create = function (req, res) {
    const new_ticket = new Ticket(req.body);
    //handles null err
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message:"Please provide all required field"});
    } else {
        Ticket.create(new_ticket, function(err, ticket){
            if (err)  
                res.send(err);
            //res.json({error:false,message:"Ticket added successfully", data:ticket });
            // перехід на таблицю
            res.redirect('/api/ticket');
        });
    }
};

//пошук за ID 
exports.findByID = function (req, res){
    Ticket.findByID(req.params.ID, function (err, ticket){
        if (err)  
            res.send(err);
            //res.json(ticket);
            // перехід на сторінку редагування
            res.render('ticket_edit.ejs', {Ticket:ticket});

    });
};

//зміна запису з певним ID у БД
exports.update = function (req, res){
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message:"Please provide all required field"});
    } else {
        Ticket.update (req.params.ID, new Ticket(req.body),function(err, ticket){
            if (err)  
                res.send(err);
            //res.json({error:false,message:"Ticket updated successfully"});
            // перехід на таблицю
            res.redirect('/api/ticket');
            
        });
    }
};
// видалення запису з певним ID у БД
// ID - значення id квитка
// result - результат запиту 
exports.delete = function (req, res){
    Ticket.delete(req.params.ID,function(err, ticket){
        console.log("HI" + req.params.ID)
        if (err)  
            res.send(err);
        //res.json({error:false,message:"Ticket deleted successfully"});
         // перехід на таблицю
         res.redirect('/api/ticket');
    });
};