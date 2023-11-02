import {
  conectarBaseDeDatos,
  obtenerColeccion,
  cerrarConexion,
} from "./dbcon.js";
import express from "express";

const Consultas = express.Router();

Consultas.get("/consulta1", async (req, res) => {
  console.log("CONSULTA 1");
  try {
    await conectarBaseDeDatos();

    const miColeccion = obtenerColeccion("libro");
    const query = { Stock: { $gt: 0 } };
    const sort = { id: 1 };

    const result = await miColeccion.find(query).sort(sort).toArray();
    res.json(result);
  } catch (error) {
    console.log("CATCH");
    res.status(500).send("Error al obtener los libros");
  } finally {
    console.log("FINALLY");
    await cerrarConexion();
  }
});
Consultas.post("/consulta2", async (req, res) => {
  console.log("CONSULTA 2");
  console.log("CATEGORIA", req.body);
  let categoriaBuscada = req.body.categoria; // Recupera la categoría desde el cuerpo de la petición POST
  try {
    await conectarBaseDeDatos();

    const miColeccion = obtenerColeccion("libro");
    const query = {
      "categoria.nombre": { $regex: new RegExp(`^${categoriaBuscada}$`, "i") },
    };
    const sort = { id: 1 };
    const result = await miColeccion.find(query).sort(sort).toArray();
    console.log("RESULTADO 2", result);
    res.json(result);
  } catch (error) {
    console.log("CATCH");
    res
      .status(500)
      .send(
        `Error al obtener los libros de la categoría "${categoriaBuscada}"`
      );
  } finally {
    console.log("FINALLY");
    await cerrarConexion();
  }
});
Consultas.post("/consulta3", async (req, res) => {
  console.log("CONSULTA 3");
  // console.log("Autor",req.body)
  let autorbuscado = req.body.autor; // Recupera la categoría desde el cuerpo de la petición POST
  try {
    await conectarBaseDeDatos();

    const miColeccion = obtenerColeccion("libro");
    const query = {
      "autor.nombre": { $regex: new RegExp(`^${autorbuscado}$`, "i") },
    };
    const result = await miColeccion.find(query).toArray();
    //   console.log("RESULTADO 2",result)
    res.json(result);
  } catch (error) {
    console.log("CATCH");
    res
      .status(500)
      .send(
        `Error al obtener los libros de la categoría "${categoriaBuscada}"`
      );
  } finally {
    console.log("FINALLY");
    await cerrarConexion();
  }
});

Consultas.get("/consulta4", async (req, res) => {
  console.log("CONSULTA 4");
  // console.log("Autor",req.body)
  let autorbuscado = req.body.autor; // Recupera la categoría desde el cuerpo de la petición POST
  try {
    await conectarBaseDeDatos();
    const miColeccion = obtenerColeccion("libro");
    const sort = { Calificacion: -1 };

    const result = await miColeccion.find().sort(sort).toArray();
    //   console.log("RESULTADO 2",result)
    res.json(result);
  } catch (error) {
    console.log("CATCH");
    res.status(500).send(`Error al obtener los libros de la categoría ""`);
  } finally {
    console.log("FINALLY");
    await cerrarConexion();
  }
});

Consultas.post("/consulta5", async (req, res) => {
  console.log("CONSULTA 5");
  let menoracuanto = req.body.precio; // Recupera la categoría desde el cuerpo de la petición POST
  try {
    await conectarBaseDeDatos();

    const miColeccion = obtenerColeccion("libro");
    const query = { Precio: { $lt: menoracuanto } };
    const sort = { Precio: -1 };

    const result = await miColeccion.find(query).sort(sort).toArray();
    res.json(result);
  } catch (error) {
    console.log("CATCH");
    res.status(500).send("Error al obtener los libros");
  } finally {
    console.log("FINALLY");
    await cerrarConexion();
  }
});

Consultas.post("/consulta6", async (req, res) => {
  console.log("CONSULTA 6");
  let titulo = req.body.titulo; // Recupera la categoría desde el cuerpo de la petición POST
  let descripcion = req.body.descripcion; // Recupera la categoría desde el cuerpo de la petición POST
  try {
    await conectarBaseDeDatos();

    const miColeccion = obtenerColeccion("libro");
    const query = {
      $or: [
        { Titulo: { $regex: titulo, $options: "i" } },
        { Descripcion: { $regex: descripcion, $options: "i" } },
      ],
    };

    const result = await miColeccion.find(query).toArray();
    res.json(result);
  } catch (error) {
    console.log("CATCH");
    res.status(500).send("Error al obtener los libros");
  } finally {
    console.log("FINALLY");
    await cerrarConexion();
  }
});

Consultas.get("/consulta7", async (req, res) => {
  console.log("CONSULTA 7");
  // console.log("Autor",req.body)
  let autorbuscado = req.body.autor; // Recupera la categoría desde el cuerpo de la petición POST
  try {
    await conectarBaseDeDatos();
    const miColeccion = obtenerColeccion("libro");

    const pipeline = [
      {
        $group: {
          _id: "$autor.nombre",
          TotalPrecioLibros: { $sum: "$Precio" },
        },
      },
      {
        $project: {
          Autor: "$_id",
          TotalPrecioLibros: 1,
          _id: 0 // Esto elimina el campo _id original
        }
      },
      {
        $sort: {
          TotalPrecioLibros: -1,
        },
      },
      {
        $limit: 10,
      },
    ];

    const result = await miColeccion.aggregate(pipeline).toArray();
    console.log("RESULTS",result)
    res.json(result);
  } catch (error) {
    console.log("CATCH");
    res.status(500).send(`Error al obtener los libros de la categoría ""`);
  } finally {
    console.log("FINALLY");
    await cerrarConexion();
  }
});

Consultas.post("/consulta8", async (req, res) => {
    console.log("CONSULTA 8");
    // console.log("Autor",req.body)
    let titulo = req.body.titulo; // Recupera la categoría desde el cuerpo de la petición POST
    try {
      await conectarBaseDeDatos();
      const miColeccion = obtenerColeccion("libro");
  
      const pipeline = [
        {
          $match: {
            Titulo: {
                $regex: new RegExp(`^${titulo}$`, "i")
            }
          }
        },
        {
          $project: {
            Titulo: 1,
            Stock: 1,
            _id: 0 
          }
        }

      ];
  
      const result = await miColeccion.aggregate(pipeline).toArray();
      console.log("RESULTS",result)
      res.json(result);
    } catch (error) {
      console.log("CATCH");
      res.status(500).send(`Error al obtener los libros de la categoría ""`);
    } finally {
      console.log("FINALLY");
      await cerrarConexion();
    }
  });

  Consultas.get("/consulta9", async (req, res) => {
    console.log("CONSULTA 9");
    // console.log("Autor",req.body)
    let autorbuscado = req.body.autor; // Recupera la categoría desde el cuerpo de la petición POST
    try {
      await conectarBaseDeDatos();
      const miColeccion = obtenerColeccion("libro");
  
      const pipeline = [
        {
          $group: {
            _id: null,
            PrecioPromedio: { $avg: "$Precio" },
          }
        }
      ];
  
      const result = await miColeccion.aggregate(pipeline).toArray();
      console.log("RESULTS",result)
      res.json(result);
    } catch (error) {
      console.log("CATCH");
      res.status(500).send(`Error al obtener los libros de la categoría ""`);
    } finally {
      console.log("FINALLY");
      await cerrarConexion();
    }
  });

  Consultas.get("/consulta10", async (req, res) => {
    console.log("CONSULTA 10");
    // console.log("Autor",req.body)
    let autorbuscado = req.body.autor; // Recupera la categoría desde el cuerpo de la petición POST
    try {
      await conectarBaseDeDatos();
      const miColeccion = obtenerColeccion("libro");
  
      const pipeline = [
        {
          $group: {
            _id: "$categoria.nombre",
            ConteodeLibros: { $sum:1 },
            Libros:{
                $push:{
                    Titulo:"$Titulo",
                    Autor: "$autor.nombre"
                }
            }
          }
        }
      ];
  
      const result = await miColeccion.aggregate(pipeline).toArray();
      console.log("RESULTS",result)
      res.json(result);
    } catch (error) {
      console.log("CATCH");
      res.status(500).send(`Error al obtener los libros de la categoría ""`);
    } finally {
      console.log("FINALLY");
      await cerrarConexion();
    }
  });

export default Consultas;
