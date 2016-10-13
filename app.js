var express = require('express'),
    morgan = require('morgan'),
    chalk = require('chalk'),
    bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.valTok) {
    console.log(chalk.red("Validating webhook"));
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

var portNum = process.env.PORT || 3000;

app.listen(portNum, function () {
  console.log(chalk.blue('FBChatBotServer listening on port ' + portNum + '! ♪♩♫♯♭'));
});
