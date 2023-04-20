//import { express } from "express";
//import {exports} from "../controller/client.controller";
const express = require('express');
// новий маршрутизатор
const router = express.Router();
const ticketController = require("../controller/ticket.controller");
// перегляд
router.get('/', ticketController.findAll);
//створення
router.post('/', ticketController.create);
// пошук за ID
router.get('/:ID', ticketController.findByID);
//редагування 
router.put('/:ID', ticketController.update);
// видалення за ID
router.delete('/:ID', ticketController.delete);
// експорт за замовчуванням router
module.exports = router;