// !Додаємо для виведення
const express = require('express')
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);

//import Client  from "../model/client.model";
const Client = require("../model/client.model");
// на вході кожного методу буде запит, записаний у req. 
// на виході результат, отриманий від моделі, інфа про помилки
// i error:false якщо помилок немає у форматі json

// Виведення усіх клієнтів з атблиці
exports.findAll = function (req, res){
    Client.findAll(function (err, client){
        console.log("controller");
        if (err)  
             res.send(err);
        //res.send(client);
         //зєднання з файлом виведення
         res.render('client.ejs', {Client:client});
         
    });
};

//створення нового запису у БД
exports.create = function (req, res) {
    const new_client = new Client(req.body);
    //handles null err
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message:"Please provide all required field"});
    } else {
        Client.create(new_client, function(err, client){
            if (err)  res.send(err);
            //res.json({error:false,message:"Client added successfully", data:client });
            // перехід на таблицю
            res.redirect('/api/client');
        });
    }
};

//пошук за ID 
exports.findByID = function (req, res){
    Client.findByID(req.params.ID, function (err, client){
        if (err)  res.send(err);
           // res.json(client);
           // перехід на сторінку редагування
           res.render('client_edit.ejs', {Client:client});

    });
};

//зміна запису з певним ID у БД
exports.update = function (req, res){
    if (req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({error:true, message:"Please provide all required field"});
    } else {
        Client.update (req.params.ID, new Client(req.body),function(err, client){
            if (err)  res.send(err);
            //res.json({error:false,message:"Client updated successfully"});
            res.redirect('/api/client');
        });
    }
};
// видалення запису з певним ID у БД
// ID - значення id клієнта
// result - результат запиту 
exports.delete = function (req, res){
    Client.delete(req.params.ID,function(err, client){
        console.log("HI" + req.params.ID)
        if (err)  
            res.send(err);
        //res.json({error:false,message:"Client deleted successfully"});
        res.redirect('/api/client');

    });
};