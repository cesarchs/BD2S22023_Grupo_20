import fetch from 'node-fetch';
import { getConnection, querys, sql } from "./db/index.js"
var num = 169;
const pool = await getConnection();
const peticion = () => {
fetch(
        "https://api.igdb.com/v4/alternative_names",
        { method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': 'rf5rz2l7mhh48x5q4dyqyuiikr3dyg',
            'Authorization': 'Bearer 1hkmbgavqo7ztv6wvc71gts84u4z1q',
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
        
        num = num + 10;
        console.log("NUM: ",num)

        try {
            for(let i = 0; i < 10; i++){
                console.log()
                if(data[i] == undefined){
                    console.log("------------ERROR---INICIO-------")
                    console.log(data[i])
                    console.log("-------------ERROR  FIN---------")
                }else{
                    // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++")
                    // console.log(data[0].id); // Ahora aquí deberías ver los datos deserializados
                    // console.log(data[0].name); // Ahora aquí deberías ver los datos deserializados
                    // console.log(data[0].url); // Ahora aquí deberías ver los datos deserializados
                    // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++")
                    await pool.request()
                      .input("id", sql.Int, data[i].id)
                      .input("id_game", sql.Int, data[i].game)
                      .input("comment", sql.VarChar, data[i].comment)
                      .input("name", sql.VarChar, data[i].name)
                      .query(querys.addAlternative_Name);
                    console.log("agregado correctamente");
                }
            }
            // res.json("agregado correctamente");
            
          } catch (error) {
            // res.status(500);
            console.log(500);
            console.log(error.message)
            // res.send(error.message);  
          }


    })
    .catch(err => {
        console.error(err);
    });        
}

setInterval(() => peticion(), 1000)