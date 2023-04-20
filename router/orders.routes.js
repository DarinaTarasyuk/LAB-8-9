//import { express } from "express";
//import {exports} from "../controller/client.controller";
const express = require('express');
// новий маршрутизатор
const router = express.Router();
const orderController = require("../controller/orders.controller");
// перегляд
router.get ('/', orderController.findAll);
//створення
router.post('/', orderController.create);
// пошук за ID
router.get('/:ID', orderController.findByID);
//редагування 
router.put('/:ID', orderController.update);
// видалення за ID
router.delete('/:ID', orderController.delete);
// експорт за замовчуванням router
module.exports = router;