import fetch from 'node-fetch';
import { getConnection, querys, sql } from "./db/index.js"
var num = 1;
const pool = await getConnection();
const peticion = () => {
fetch(
        "https://api.igdb.com/v4/platform_version_release_dates",
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
                      .input("category", sql.Int, data[i].category )
                      .input("date", sql.BigInt, data[i].date)
                      .input("human", sql.NVarChar, data[i].human)
                      .input("m", sql.Int, data[i].m)
                      .input("region", sql.Int, data[i].region)
                      .input("y", sql.Int, data[i].y)
                      .query(querys.platform_version_releasedate);
                
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

//setInterval(() => peticion(), 1000)


fetch(
    "https://api.igdb.com/v4/platform_version_release_dates",
    { method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID': 'etamy4nugfs5ujw3jaiond9wlw77j1',
        'Authorization': 'Bearer rrnmuct08yldcqtj2p9y41y6u9tp9w',
    },
    body: `fields *; limit 1; sort id desc;`
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

   console.log(data)


})
.catch(err => {
    console.error(err);
});  