const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017/gamestwitch'; // Reemplaza con tu URI de MongoDB
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function consultaMongoDB() {
  try {
    await client.connect();
    console.log('Conectado a la base de datos');

    const database = client.db('gamestwitch'); // Reemplaza con el nombre de tu base de datos
    const collection = database.collection('ultima'); // Reemplaza con el nombre de tu colección

    const query = { Game: { $regex: /god of/ , $options:'i' } };
    const result = await collection.find(query).toArray();

    // Iterar a través de los resultados y convertir los objetos anidados a cadenas legibles
    const resultadosLegibles = result.map((documento) => {
      for (const key in documento) {
        if (typeof documento[key] === 'object') {
          documento[key] = JSON.stringify(documento[key]);
        }
      }
      return documento;
    });

    console.log('Resultados de la consulta:');
    console.log(resultadosLegibles);
  } finally {
    await client.close();
    console.log('Conexión cerrada');
  }
}

consultaMongoDB();
