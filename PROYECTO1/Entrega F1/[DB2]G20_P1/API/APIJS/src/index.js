import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import Router from './routes/usuarioNode.route.js'
import 'dotenv/config' //para usar variables de entorno
import morgan from "morgan";
/*
Intercambio de Recursos de Origen Cruzado (CORS) es una característica de seguridad 
del navegador que restringe las solicitudes HTTP de origen cruzado que se inician 
desde secuencias de comandos que se ejecutan en el navegador.

El intercambio de recursos de origen cruzado (CORS) es un mecanismo que permite a una
página web realizar solicitudes a otro dominio distinto del desde el que se sirvió la
página. Normalmente, las solicitudes entre dominios estarían prohibidas por los navegadores web.
*/
const PORT = process.env.PORT || 3005;
const app = express();
app.use(cors())
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/',Router);

//incio app
app.listen(PORT,() => { 
    console.log('Server running on port', PORT)
})
