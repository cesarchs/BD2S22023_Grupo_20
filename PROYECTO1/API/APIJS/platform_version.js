import fetch from 'node-fetch';
import { getConnection, querys, sql } from "./db/index.js"
var num = 1;
const pool = await getConnection();
const peticion = () => {
fetch(
        "https://api.igdb.com/v4/platform_versions",
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

                    if(data[i].connectivity == undefined){
                        data[i].connectivity = "";
                    }
                    if(data[i].cpu == undefined){
                        data[i].cpu = "";
                    }
                    if(data[i].graphic == undefined){
                        data[i].graphic = "";
                    }
                    if(data[i].media == undefined){
                        data[i].media = "";
                    }
                    if(data[i].memory == undefined){
                        data[i].memory = "";
                    }
                    if(data[i].name == undefined){
                        data[i].name = "";
                    }
                    if(data[i].os == undefined){
                        data[i].os = "";
                    }
                    if(data[i].slug == undefined){
                        data[i].slug = "";
                    }
                    if(data[i].sound == undefined){
                        data[i].sound = "";
                    }
                    if(data[i].storage == undefined){
                        data[i].storage = "";
                    }
                    if(data[i].summary == undefined){
                        data[i].summary = "";
                    }
                    if(data[i].url == undefined){
                        data[i].url = "";
                    }
                    if(data[i].platform_version_release_dates == undefined){
                        data[i].platform_version_release_dates = [];
                    }
                    if(data[i].platform_logo == undefined){
                        data[i].platform_logo = 0;
                    }
                    if(data[i].companies == undefined){
                        data[i].companies = [];
                    }
                    if(data[i].online == undefined){
                        data[i].online = "";
                    }
                    if(data[i].resolutions == undefined){
                        data[i].resolutions = "";
                    }


                    await pool.request()
                      .input("id", sql.Int, data[i].id)
                      .input("connectivity", sql.VarChar, data[i].connectivity )
                      .input("cpu", sql.VarChar, data[i].cpu)
                      .input("graphics", sql.VarChar, data[i].graphics)
                      .input("media", sql.VarChar, data[i].media)
                      .input("memory", sql.VarChar, data[i].memory)
                      .input("platform_logo", sql.Int, data[i].platform_logo)
                      .input("name", sql.VarChar, data[i].name)
                      .input("os", sql.VarChar, data[i].os)
                      .input("slug", sql.VarChar, data[i].slug)
                      .input("sound", sql.VarChar, data[i].sound)
                      .input("storage", sql.VarChar, data[i].storage)
                      .input("summary", sql.VarChar, data[i].summary)
                      .input("url", sql.VarChar, data[i].url)
                      .input("online", sql.VarChar, data[i].online)
                      .input("resolutions", sql.VarChar, data[i].resolutions)
                      .query(querys.platform_version);
                
                      for(let j=0; j < data[i].platform_version_release_dates.length; j++){
                        await pool.request()
                        .input("id_Platform_version", sql.Int, data[i].id)
                        .input("id_Platform_version_releasedate", sql.Int, data[i].platform_version_release_dates[j])                        
                        .query(querys.platform_releases);
                      }


                      for(let j=0; j < data[i].companies.length; j++){
                        await pool.request()
                        .input("id_Platform_version", sql.Int, data[i].id)
                        .input("id_Platform_version_company", sql.Int, data[i].companies[j])
                        .query(querys.Platform_company);
                      }
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

//setInterval(() => peticion(), 3000)


fetch(
    "https://api.igdb.com/v4/platform_versions",
    { method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID': 'etamy4nugfs5ujw3jaiond9wlw77j1',
        'Authorization': 'Bearer rrnmuct08yldcqtj2p9y41y6u9tp9w',
    },
    body: `fields *; limit 1; sort id desc; where id = 80;`
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