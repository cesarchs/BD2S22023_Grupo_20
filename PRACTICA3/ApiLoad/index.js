import express from'express'
const app = express();
const PORT = 4040;
import bodyParser from'body-parser'
import { test, insert, listAllPeliculas, SearchGenrePelicula, ListAllCalsificationR, ListarDirigidasDirector, ListarPrecioBajo15} from './funcs/funcs.js'

import Consultas from './funcs/funcs3.js';

var jsonParser = bodyParser.json()

app.use(express.json())
 
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

app.use('/', Consultas)

app.get('/insert-libros', jsonParser,(req, res) => test(req, res));

app.get('/insertPeliculas', jsonParser,(req, res) => insert(req, res));

app.get('/listAllPeliculas', jsonParser,(req, res) => listAllPeliculas(req, res));

app.get('/searchgenrePeliculas/:genero', jsonParser,(req, res) => SearchGenrePelicula(req, res));

app.get('/ListAllCalsificationR', jsonParser,(req, res) => ListAllCalsificationR(req, res));

app.get('/ListarDirigidasDirector/:director', jsonParser,(req, res) => ListarDirigidasDirector(req, res));

app.get('/ListarPrecioBajo15', jsonParser,(req, res) => ListarPrecioBajo15(req, res));



app.listen(PORT || process.env.PORT )