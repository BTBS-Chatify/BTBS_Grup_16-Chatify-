// 👇️ using require() CommonJS imports
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/profile', (req, res, next) => {
    console.log(req.body)
    res.json(req.body)
})

app.get('/merhaba/:id', (req, res, next) => {
    res.send(req.params.id);
})

const port = 3005;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
