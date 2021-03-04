var express = require('express')
  , routes = require('routes')
  , http = require('http');

var app = express();
var server = app.listen(80);
//var io = require('socket.io').listen(server); // this tells socket.io to use our express server
/*
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
*/

app.get('/', function(req, res)
{
  console.log('Usuario acessou home');
  res.send("home");
});

app.get('/teste', function(req, res)
{
  console.log('Usuario testou');
  res.send("teste2");
});

app.get('/chat', function(req, res)
{
  const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
  });

readline.question(`What's your name?`, (name) => {
  console.log(`Hi ${name}!`);
  readline.close();
  res.send(name);
  });

});



app.get('*', function(req, res)
{
  console.log('Usuario acessou pagina invalida');
  res.send("404");
});

/*
io.sockets.on('connection', function (socket) {
    console.log('A new user connected!');
    socket.emit('info', { msg: 'The world is round, there is no up or down.' });
});
*/

console.log("Express server listening on port 3000");