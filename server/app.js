const express = require('express');
const bodyParser = require('body-parser');
const { ValidationError } = require('express-validation');

const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

app.use('/auth', require('./controllers/auth'));

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    return res.status(400).json(err)
})


const port = 3005;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
