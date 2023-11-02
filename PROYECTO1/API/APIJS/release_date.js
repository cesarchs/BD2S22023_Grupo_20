import fetch from 'node-fetch';
import { getConnection, querys, sql } from "./db/index.js"
var num = 77595;
const pool = await getConnection();
const peticion = () => {
    fetch(
            "https://api.igdb.com/v4/release_dates",
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
            
            num = num + 10;
            console.log("NUM: ",num)
    
            try {
                for(let i = 0; i < 10; i++){
                    // console.log()
                    if(data[i] == undefined){
                        // console.log("------------ERROR---INICIO-------")
                        // console.log(i+num-10)
                        // console.log("-------------ERROR  FIN---------")
                    }else{
                        if(data[i].date == undefined){
                            data[i].date = -2208988800;
                        }   
                        if (data[i].human == undefined){
                            data[i].human = "";
                        }
                        if (data[i].platform == undefined){
                            data[i].platform = 0;
                        }
                        if (data[i].region == undefined){
                            data[i].region = 0;
                        }
                        if (data[i].status == undefined){
                            data[i].status = 0;
                        }
                        if (data[i].m == undefined){
                            data[i].m = 0;
                        }
                        if (data[i].y == undefined){
                            data[i].y = 0;
                        }
                        if (data[i].game == undefined){
                            data[i].game = 0;
                        }
                        await pool.request()
                          .input("id", sql.Int, data[i].id)
                          .input("date", sql.BigInt, data[i].date )
                          .input("human", sql.VarChar, data[i].human)
                          .input("platform", sql.Int, data[i].platform)
                          .input("region", sql.Int, data[i].region)
                          .input("status", sql.Int, data[i].status)
                          .input("m", sql.Int, data[i].m)
                          .input("y", sql.Int, data[i].y)
                          .input("id_game", sql.Int, data[i].game)
                          .query(querys.addrelease_date);
                    
                        console.log(num+i-10 ,"agregado correctamente");
                    }
                }
                // res.json("agregado correctamente");
                
              } catch (error) {
                // res.status(500);
                // console.log(500);
                // console.log(error.message)
                // res.send(error.message);  
              }
    
    
        })
        .catch(err => {
            console.error(err);
        });        
    }
    
setInterval(() => peticion(), 400)


// fetch(
//     "https://api.igdb.com/v4/release_dates",
//     { method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Client-ID': 'wvy8k49cvhyd1yywjd9ur7hkpl7zoc',
//         'Authorization': 'Bearer jk61hgwkq8sagb0fupl2h78assu74j',
//       },
//       body: "fields *; limit 1; sort id desc;"
//   })
//   .then(response => {
//     if (!response.ok) {
//         throw new Error(`Error HTTP: ${response.status}`);
//     }
//     return response.json();
// })
// .then(data => {
//     console.log(data); // Ahora aquí deberías ver los datos deserializados
// })
// .catch(err => {
//     console.error(err);
// });

