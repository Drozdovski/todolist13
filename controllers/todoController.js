var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var uristring =
    process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/3000/todo';

 mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

//mongoose.connect('mongodb://test:test@ds119533.mlab.com:19533/to_do');

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);


//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

app.get('/', function (req, res) {
  Todo.find({}, function(err, data){
    if (err) throw err;
    res.render('todo', {todos: data});
  });

});

app.post('/', urlencodedParser, function (req, res) {
  var newTodo = Todo(req.body).save(function(err,data) {
    if (err) throw err;
    res.json(data);
  });
});

app.delete('/:item', function (req, res) {
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err,data) {
    if (err) throw err;
    res.json(data);
  });
});

};
