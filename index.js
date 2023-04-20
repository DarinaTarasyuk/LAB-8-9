const express = require('express');
const bodyParser = require('body-parser');
//var connection = require('./config/config.bd')

//встановлення порту
const PORT = 5000;
const app = express();
//парсити запити типу content-type - application/x-www-form-urllencoded
app.use(bodyParser.urlencoded({extended:true}))

//парсити запити типу content-type - application/json
//app.use(bodyParser.json)

//шаблони сторінок у форматі hbs
app.set("view engine", "hbs")
//Обробка get запиту - endpoint
//вхід
// адреса, за якою він буде працювати
//функція, що буде виконуватись по запиту на цій endpoint
//параметри функція
// req - запит
// res - відповідь
app.get ('/', (req,res) => {
    // 200 - успішний статус
    // json - тіло відповіді повідомлення
    res.status(200).json("Сервер працює.")
})

//require client routes
const clientRoutes = require('./router/client.routes');
app.use('/api/client', clientRoutes);

//require orders routes
const orderRoutes = require('./router/orders.routes');
app.use('/api/orders', orderRoutes);

//require ticket routes
const ticketRoutes = require('./router/ticket.router');
app.use('/api/ticket', ticketRoutes);

//створення екземпляру застосунку
//вхід, порт, callback фанкція, яка відпрацьовує лишу у випадку упішного запуску сервера
app.listen(PORT, () => console.log("SERVER START!"))

//npm run dev