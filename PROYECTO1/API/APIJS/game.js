import { resolveInclude } from 'ejs';
import fetch from 'node-fetch';
import { getConnection, querys, sql } from "./db/index.js"
var num = 1;
const pool = await getConnection();
async function peticion() {
fetch(
        "https://api.igdb.com/v4/games",
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
                if(data[i] == undefined){
                    console.log("------------ERROR---INICIO-------")
                    // console.log(data[i])
                    console.log(num+i -10)
                    console.log("------------ERROR---FIN-------")
                }else{
                    if(data[i].genres == undefined){
                        data[i].genres = [];
                    }           
                    if(data[i].games_modes == undefined){
                        data[i].game_modes = [];
                    }
                    if(data[i].franchises == undefined){
                        data[i].franchises = [];
                    }         
                    if(data[i].game_engines == undefined){
                        data[i].game_engine = [];
                    }         
                    if(data[i].player_perspectives == undefined){
                        data[i].player_perspectives = [];
                    }         
                    if(data[i].themes == undefined){
                        data[i].themes = [];
                    }         
                    if(data[i].platforms == undefined){
                        data[i].platforms = [];
                    }         
                    if(data[i].name == undefined){
                        data[i].name = "";
                    }         
                    if(data[i].first_release_date == undefined){
                        data[i].first_release_date = 0;
                    }         
                    if(data[i].summary == undefined){
                        data[i].summary = "";
                    }         
                    if(data[i].rating == undefined){
                        data[i].rating = 0;
                    }         
                    if(data[i].aggregated_rating == undefined){
                        data[i].aggregated_rating = 0;
                    }         
                    if(data[i].total_rating == undefined){
                        data[i].total_rating = 0;
                    }         
                    if(data[i].storyline == undefined){
                        data[i].storyline = "";
                    }         
                    if(data[i].collection == undefined){
                        data[i].collection = 0;
                    }         


                    const x = miFuncion(data,i)
                    
                    
                    
                    for (const element of data[i].genres) {
                        const y = generos(data,i,element)
                        //     try{
                            //         const espera = await  pool.request()
                            //         .input("id_game", sql.Int, data[i].id)                        
                    //         .input("id", sql.Int, element)                      
                    //         .query(querys.addGenre_Game) 

                    //         // console.log("Generos con juegos agregados")
                    //     }
                    //     catch(error){
                    //     }
                }        
                // for (const element of data[i].game_modes) {
                //         const z = game_modes(data,i,element)
                    //     try{
                    //         const espera = await  pool.request()
                    //         .input("id_game", sql.Int, data[i].id)                        
                    //         .input("id", sql.Int, element)                      
                    //         .query(querys.addGame_Mode_Game)   
                    //         // console.log("Modo de Juegos con juegos agregados")
                    //     }
                    //     catch(error){
                    //     }
                    // }        
                    // for (const element of data[i].franchises) {
                    //     try{

                    //         const espera = await  pool.request()
                    //         .input("id_game", sql.Int, data[i].id)                        
                    //         .input("id", sql.Int, element)                      
                    //         .query(querys.addFranchise_Game)   
                    //         // console.log("Franquicia con juegos agregados")
                    //     }
                    //     catch(error){
                    //     }
                    // }        
                    // for (const element of data[i].game_engines) {
                    //     try{

                    //         const espera = await  pool.request()
                    //         .input("id_game", sql.Int, data[i].id)                        
                    //         .input("id", sql.Int, element)                      
                    //         .query(querys.addGame_Engine_Game)   
                    //         // console.log("Motor de juego con juegos agregados")
                    //     }
                    //     catch(error){
                    //     }
                    // }        
                    // for (const element of data[i].player_perspectives) {
                    //     try{

                    //         const espera = await  pool.request()
                    //         .input("id_game", sql.Int, data[i].id)                        
                    //         .input("id", sql.Int, element)                      
                    //         .query(querys.addPlayer_Perspective_Game)   
                    //         // console.log("Perspectiva con juegos agregados")
                    //     }
                    //     catch(error){
                    //     }
                    // }        
                    // for (const element of data[i].themes) {
                    //     try{

                    //         const espera = await  pool.request()
                    //         .input("id_game", sql.Int, data[i].id)                        
                    //         .input("id", sql.Int, element)                      
                    //         .query(querys.addThemes_Game)   
                    //         // console.log("Tema con juegos agregados")
                    //     }
                    //     catch(error){
                    //     }
                    // }        
                    // for (const element of data[i].platforms) {
                    //     try{

                    //         const espera = await  pool.request()
                    //         .input("id_game", sql.Int, data[i].id)                        
                    //         .input("id", sql.Int, element)                      
                    //         .query(querys.addPlatform_Game)   
                    //         // console.log("Plataforma con juegos agregados")
                    //     }
                    //     catch(error){
                    //     }
                    // }        

                    

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


async function miFuncion(data,i) {
    return new Promise((resolve, reject) => {
        // Dentro de esta función, puedes realizar alguna operación asíncrona
        // Por ejemplo, simulemos una operación de espera de 2 segundos
        try{

            pool.request()
            .input("id", sql.Int, data[i].id)
            .input("name", sql.VarChar, data[i].name )
            .input("first_release_date", sql.Int, data[i].first_release_date)
            .input("summary", sql.VarChar, data[i].summary)
            .input("rating", sql.Float, data[i].rating)
            .input("aggregated_rating", sql.Float, data[i].aggregated_rating )
            .input("local_rating", sql.Float, data[i].total_rating)
            .input("storyline", sql.VarChar, data[i].storyline)
            .input("collections", sql.Int, data[i].collection)
            .query(querys.addGame)
            .then( async () =>  {
                    console.log(data[i].id," agregado correctamente");
                    resolve(true)
            });
        }
        catch(error){
            reject(false)
        }

    });
}
async function generos(data,i,element) {
    return new Promise((resolve, reject) => {
        // Dentro de esta función, puedes realizar alguna operación asíncrona
        // Por ejemplo, simulemos una operación de espera de 2 segundos
        try{
            pool.request()
            .input("id_game", sql.Int, data[i].id)                        
            .input("id", sql.Int, element)                      
            .query(querys.addGenre_Game) 
            .then( async () =>  {
                console.log("Generos con juegos agregados")
                resolve(true)
            });
        }
        catch(error){
            reject(false)
        }

    });
}
// async function game_modes(data,i,element) {
//     return new Promise((resolve, reject) => {
//         // Dentro de esta función, puedes realizar alguna operación asíncrona
//         // Por ejemplo, simulemos una operación de espera de 2 segundos
//         try{
//             pool.request()
//             .input("id_game", sql.Int, data[i].id)                        
//             .input("id", sql.Int, element)                      
//             .query(querys.addGame_Mode_Game)   
//             .then(async () =>  {
//                 console.log("Generos con juegos agregados")
//                 resolve(true)
//             });
//         }
//         catch(error){
//             reject(false)
//         }

//     });
// }


setInterval(() => peticion(), 1000)