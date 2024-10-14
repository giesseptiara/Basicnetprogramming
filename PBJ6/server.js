const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse application/json
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));

// Call routes
var routes = require('./routes');
routes(app);

app.listen(3224, () => {
  console.log('Server started on port 3224');
});