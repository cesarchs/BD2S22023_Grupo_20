import fetch from 'node-fetch';
import { getConnection, querys, sql } from "./db/index.js"
var num = 1;
const pool = await getConnection();
const peticion = () => {
fetch(
        "https://api.igdb.com/v4/involved_companies",
        { method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client-ID': 'rf5rz2l7mhh48x5q4dyqyuiikr3dyg',
            'Authorization': 'Bearer 1hkmbgavqo7ztv6wvc71gts84u4z1q',
        },
        body: `fields id, company, game, developer, porting, publisher, supporting; where id = (${num},${num+1},${num+2},${num+3},${num+4},${num+5},${num+6},${num+7},${num+8},${num+9}); sort id asc;`
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
                    
                    if(data[i].developer == true){
                        data[i].developer = "true"
                    }
                    if(data[i].developer == false || data[i].developer == undefined){
                        data[i].developer = "false"
                    }
                    if(data[i].porting == true){
                        data[i].porting = "true"
                    }
                    if(data[i].porting == false || data[i].porting == undefined){
                        data[i].porting = "false"
                    }
                    if(data[i].publisher == true){
                        data[i].publisher = "true"
                    }
                    if(data[i].publisher == false || data[i].publisher == undefined){
                        data[i].publisher = "false"
                    }
                    if(data[i].supporting == true){
                        data[i].supporting = "true"
                    }
                    if(data[i].supporting == false || data[i].supporting == undefined){
                        data[i].supporting = "false"
                    }
                    await pool.request()
                      .input("id", sql.Int, data[i].id)
                      .input("company", sql.Int, data[i].company)
                      .input("game", sql.Int, data[i].game)
                      .input("developer", sql.VarChar, data[i].developer)
                      .input("porting", sql.VarChar, data[i].porting)
                      .input("publisher", sql.VarChar, data[i].publisher)
                      .input("supporting", sql.VarChar, data[i].supporting)
                      .query(querys.addInvolved_Company);
                
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