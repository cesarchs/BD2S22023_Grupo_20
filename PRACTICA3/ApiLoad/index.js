import express from'express'
const app = express();
const PORT = 4040;
import bodyParser from'body-parser'
import { test, insert, listAllPeliculas, SearchGenrePelicula, ListAllCalsificationR, ListarDirigidasDirector, ListarPrecioBajo15, top10Directores, PrecioPromedioPeliculas, ListaordenarMayorMenor} from './funcs/funcs.js'
import {getallPelis, SearchGYearPelicula } from './funcs/funcs2.js'


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

app.get('/listAllPeliculas', jsonParser,(req, res) => listAllPeliculas(req, res));

app.get('/searchgenrePeliculas/:genero', jsonParser,(req, res) => SearchGenrePelicula(req, res));

app.get('/ListAllCalsificationR', jsonParser,(req, res) => ListAllCalsificationR(req, res));

app.get('/ListarDirigidasDirector/:director', jsonParser,(req, res) => ListarDirigidasDirector(req, res));

app.get('/ListarPrecioBajo15', jsonParser,(req, res) => ListarPrecioBajo15(req, res));

app.get('/top10Directores', jsonParser,(req, res) => top10Directores(req, res));

app.get('/PrecioPromedioPeliculas', jsonParser,(req, res) => PrecioPromedioPeliculas(req, res));

app.get('/ListaordenarMayorMenor', jsonParser,(req, res) => ListaordenarMayorMenor(req, res));

app.get('/SearchGYearPelicula/:FechaDeEstreno', jsonParser,(req, res) => SearchGYearPelicula(req, res));

//segunda parte 
app.get('/getallPelis', jsonParser,(req, res) => getallPelis(req, res));


app.listen(PORT || process.env.PORT )