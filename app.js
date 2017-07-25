var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//our port
app.listen(process.env.PORT || 3000);
console.log('Yo, dawgs! You are listening to port 3000');
