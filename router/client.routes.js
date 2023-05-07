//import { express } from "express";
//import {exports} from "../controller/client.controller";
const express = require('express');
// новий маршрутизатор
const router = express.Router();
const clientController = require("../controller/client.controller");
// перегляд
router.get ('/', clientController.findAll);
//створення
router.post('/', clientController.create);
// пошук за ID
router.get('/:ID', clientController.findByID);
//редагування 
//router.put('/:ID', clientController.update);
router.post('/put/:ID', clientController.update);
// видалення за ID
//router.delete('/:ID', clientController.delete);
router.get('/delete/:ID', clientController.delete);
// експорт за замовчуванням router
module.exports = router;