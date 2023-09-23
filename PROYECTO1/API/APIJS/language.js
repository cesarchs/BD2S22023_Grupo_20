import fetch from 'node-fetch';
import { getConnection, querys, sql } from "./db/index.js"
var num = 1;
const pool = await getConnection();
const peticion = () => {
fetch(
    "https://api.igdb.com/v4/languages",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': 'rf5rz2l7mhh48x5q4dyqyuiikr3dyg',
        'Authorization': 'Bearer 1hkmbgavqo7ztv6wvc71gts84u4z1q',
      },
      body: `fields id, name, native_name, locale; where id = (${num},${num+1},${num+2},${num+3},${num+4},${num+5},${num+6},${num+7},${num+8},${num+9}); sort id asc;`
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
                if (data[i].name == undefined){
                    data[i].name = " ";
                }
                if (data[i].native_name == undefined){
                    data[i].native_name = " ";
                }
                if (data[i].locale == undefined){
                    data[i].locale = " ";
                }

                await pool.request()
                  .input("id", sql.Int, data[i].id)
                  .input("name", sql.VarChar, data[i].name )
                  .input("native_name", sql.VarChar, data[i].native_name)
                  .input("locale", sql.VarChar, data[i].locale)
                  .query(querys.addLanguage);
            
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

setInterval(() => peticion(), 3000);