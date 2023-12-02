const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/auth', require('./controllers/auth'));

const port = 3005;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
