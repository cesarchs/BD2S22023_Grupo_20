import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017/librosprac3';

const client = new MongoClient(uri, { useNewUrlParser: true });

export async function conectarBaseDeDatos() {
  try {
    await client.connect();
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}

export function obtenerColeccion(coleccion) {
  return client.db('librosprac3').collection(coleccion);
}

export async function cerrarConexion() {
    await client.close();
  }