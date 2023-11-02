import { conectarBaseDeDatos, obtenerColeccion, cerrarConexion } from './dbcon.js'
import { createOrUpdate, deleteUserById, getUserById, readAllUsers, listAll, searchbygenre, ListAllClasR } from './dynamofuncs.js'

import fs from 'fs';
import fastcsv from 'fast-csv';


export  async function  test (req, res){
    console.log('insert - libros');
    try{
        await conectarBaseDeDatos();

        //console.log('Conexión a MongoDB establecida');
        const miColeccion = obtenerColeccion('libroprueba');

        

        const stream = fs.createReadStream('E:/Descargas/load/Libros.csv', 'utf-8');
        const parser = fastcsv.parse({ headers: true });

        let contadorlibros = 1;
        const results = [];
        const autores = [];
        const categoria = [];
        stream.pipe(parser)
        .on('data', async (row) => {

            // Procesa cada fila del archivo CSV aquí
            if (autores.indexOf(row.Autor) == -1) {
                autores.push(row.Autor);                
            }
            if (categoria.indexOf(row.Categoria) == -1) {
                categoria.push(row.Categoria);                
            }

            //console.log(row);

            let  nuevo = {id:results.length, Titulo: row.Titulo,  Descripcion: row.Descripcion, FechaDePublicacion: row.FechaDePublicacion, Calificacion: Number(row.Calificacion),
            Stock: Number(row.Stock), Precio: parseFloat(row.Precio),
            autor:{id: autores.indexOf(row.Autor), nombre: row.Autor }, 
            categoria:{id: categoria.indexOf(row.Categoria), nombre: row.Categoria }};

            results.push(nuevo);            
            await miColeccion.insertOne(nuevo)
            //.then((result) => {
            //     console.log(`Inserted ${result.insertedCount} item(s) with id: ${result.insertedId}`);
            // }).catch((err) => {
            //     console.error(`Error al insertar items: ${err}`);
            // });

            //await contadorlibros++;
        })
        .on('end', () => {
            //console .log('Fin del archivo');
            res.send(results);
        });

        //await cerrarConexion();
    }catch(error){
        console.error('Error al conectar a MongoDB:', error);
    }


}

export  async function  insert (req, res){

    console.log('insert - peliculas');
    try{

        const stream = fs.createReadStream('E:/Descargas/load/Peliculas.CSV', 'utf-8');
        const parser = fastcsv.parse({ headers: true });


        const results = [];
        const Director = [];
        const Distribuidora = [];
        stream.pipe(parser)
        .on('data', async (row) =>{

            // Procesa cada fila del archivo CSV aquí
            if (Director.indexOf(row.Director) == -1) {
                Director.push(row.Director);                
            }
            if (Distribuidora.indexOf(row.Distribuidora) == -1) {
                Distribuidora.push(row.Distribuidora);                
            }

            let  nuevo = {id:results.length, Titulo: row.Titulo, FechaDeEstreno: row.FechaDeEstreno, IdiomaOriginal: row.IdiomaOriginal, Descripcion: row.Descripcion, 
                Precio: parseFloat(row.Precio), Genero: row.Genero, Clasificacion: row.Clasificacion, Calificacion: Number(row.Calificacion), Precio2: parseFloat(row.Precio2),
                director:{id: Director.indexOf(row.Director), nombre: row.Director }, 
                distribuidora:{id: Distribuidora.indexOf(row.Distribuidora), nombre: row.Distribuidora }};


            //await createOrUpdate(JSON.stringify(nuevo))
            results.push(nuevo);
            await createOrUpdate(nuevo)
            
        })
        .on('end', async () => {
            res.send(results);
            //await createOrUpdate(results)
        });
       
    }catch(error){
        console.error('Error al conectar a MongoDB:', error);
    }
    
}


// funciones para peliculas

// 1. Listar todas las peliculas

export async function listAllPeliculas(req, res) {
    try {
        const data = await listAll().then((data) => {
            console.log(data)
            res.send(data)
        })        
    } catch (error) {
        res.status(500).json(error)
    }
}


export async function SearchGenrePelicula(req, res) {
    console.log(req.params.genero)
    try {
        const data = await searchbygenre(req.params.genero).then((data) => {
            console.log(data)
            res.send(data)
        })        
    } catch (error) {
        res.status(500).json(error)
    }
}

export async function ListAllCalsificationR(req, res) {
    console.log(req.params.genero)
    try {
        const data = await ListAllClasR(req.params.genero).then((data) => {
            console.log(data)
            res.send(data)
        })        
    } catch (error) {
        res.status(500).json(error)
    }
}