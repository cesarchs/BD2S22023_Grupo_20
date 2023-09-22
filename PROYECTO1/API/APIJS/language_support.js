import fetch from 'node-fetch';
import { getConnection, querys, sql } from "./db/index.js"
var num = 1;
const pool = await getConnection();
const peticion = () => {
fetch(
    "https://api.igdb.com/v4/language_supports",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'wvy8k49cvhyd1yywjd9ur7hkpl7zoc',
        'Authorization': 'Bearer jk61hgwkq8sagb0fupl2h78assu74j',
      },
      body: `fields *; where id = (${num},${num+1},${num+2},${num+3},${num+4},${num+5},${num+6},${num+7},${num+8},${num+9}); sort id asc;`
  })
  .then(response => {
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
})
.then(async data => {
    //console.log(data); // Ahora aquí deberías ver los datos deserializados
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

                await pool.request()
                  .input("id", sql.Int, data[i].id)
                  .input("id_game", sql.Int, data[i].game )
                  .input("id_language", sql.Int, data[i].language)
                  .input("language_support_type", sql.Int, data[i].language_support_type)
                  .query(querys.addLanguageSupport);
            
                console.log("agregado correctamente");
            }
        }
 
        
      } catch (error) {

        console.log(500);
        console.log(error.message)

      }

})
.catch(err => {
    console.error(err);
});
}

setInterval(() => peticion(), 5000);