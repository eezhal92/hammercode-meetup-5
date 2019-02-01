var app = require('./src/app');

var PORT = 3000;

app.listen(PORT, function () {
  console.log('API running on port: ' + PORT);
});
