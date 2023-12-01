// 👇️ using require() CommonJS imports
const express = require('express');
//const bodyParser = require('body-parser');

const app = express();

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Access the parse results as request.body
app.post('/merhaba', function(request, response){
    console.log(request.body.name);
    console.log(request.body.email);
});


const port = 3005;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
