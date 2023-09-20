import fetch from 'node-fetch';
import { getConnection, querys, sql } from "./db/index.js"
var num = 1;

const peticion =  () => {
fetch(
        "https://api.igdb.com/v4/collections",
        { method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': 'etamy4nugfs5ujw3jaiond9wlw77j1',
            'Authorization': 'Bearer rrnmuct08yldcqtj2p9y41y6u9tp9w',
        },
        body: `fields *; where id = (${num},${num+1},${num+2},${num+3},${num+4},${num+5},${num+6},${num+7},${num+8},${num+9}); sort id asc;`
        //body: "fields *; limit 1; sort rating desc;"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(async data =>  {
        // console.log(data[0]); // Ahora aquí deberías ver los datos deserializados
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++")
        console.log(data[0].id); // Ahora aquí deberías ver los datos deserializados
        console.log(data[0].name); // Ahora aquí deberías ver los datos deserializados
        console.log(data[0].url); // Ahora aquí deberías ver los datos deserializados
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++")
        num = num + 10;

        try {
            const pool = await getConnection();
            await pool.request()
              .input("id", sql.Int, data[0].id)
              .input("name", sql.VarChar, data[0].name )
              .input("url", sql.VarChar, data[0].url)
              .query(querys.addCollection);
        
            res.json("agregado correctamente");
            
          } catch (error) {
            res.status(500);
            res.send(error.message);  
          }


    })
    .catch(err => {
        console.error(err);
    });        
}

setInterval(() => peticion(), 5000)