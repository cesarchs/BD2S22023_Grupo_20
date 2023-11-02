import express from'express'
const app = express();
const PORT = 4040;
import bodyParser from'body-parser'
import { test, insert} from './funcs/funcs.js'
import { getallPelis } from './funcs/funcs2.js'

var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/insert-libros', jsonParser,(req, res) => test(req, res));

app.get('/insertPeliculas', jsonParser,(req, res) => insert(req, res));

app.get('/getallPelis', jsonParser,(req, res) => getallPelis(req, res));


console.log('Server on port', PORT);
app.listen(PORT || process.env.PORT )