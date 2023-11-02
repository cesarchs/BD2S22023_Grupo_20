const { MongoClient } = require('mongodb');

// URL de conexión a la base de datos MongoDB
const mongoURL = 'mongodb://localhost:27017/gamestwitch'; // Reemplaza con tu URL y nombre de base de datos

// Función para realizar la consulta
async function consultarDatos() {
  const client = new MongoClient(mongoURL);

  try {
    // Conectar a la base de datos
    await client.connect();

    // Seleccionar la base de datos y la colección
    const db = client.db('gamestwitch'); // Reemplaza con el nombre de tu base de datos
    const collection = db.collection('ultima'); // Reemplaza con el nombre de tu colección
    var param = "\/God of\/"

    // Realizar la consulta (aquí puedes colocar la consulta deseada)
    // const resultado = await collection.find({}).toArray();
    const resultado = await collection.find({ Game: { $regex: / param / , $options: 'i' } }).toArray();

    // Imprimir el resultado
    console.log('Resultado de la consulta:');
    console.log(resultado);
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
  } finally {
    // Cerrar la conexión
    client.close();
  }
}

// Ejecutar la función para realizar la consulta
consultarDatos();
