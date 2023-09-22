
import fetch from 'node-fetch';
import { getConnection, querys, sql } from "./db/index.js";

var num = 10053;
const pool = await getConnection();

async function peticion() {
    try {
        const response = await fetch(
            "https://api.igdb.com/v4/games",
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Client-ID': 'rf5rz2l7mhh48x5q4dyqyuiikr3dyg',
                    'Authorization': 'Bearer 1hkmbgavqo7ztv6wvc71gts84u4z1q',
                },
                body: `fields genres, game_modes, franchises, game_engines, player_perspectives, themes, platforms, name, first_release_date, summary, rating, aggregated_rating,  total_rating, storyline, collection, id; where id = (${num},${num+1},${num+2},${num+3},${num+4},${num+5},${num+6},${num+7},${num+8},${num+9}); sort id asc;`
            }
        );

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        num += 10;
        console.log("NUM: ", num);

        for (let i = 0; i < 10; i++) {
            // ... (tu código para procesar y agregar la data a la DB)
            if(data[i] == undefined){
                    console.log("------------ERROR---INICIO-------")
                    // console.log(data[i])
                    console.log(num+i -10)
                    // console.log("------------ERROR---FIN-------")
                }else{
                    if(data[i].genres == undefined){
                        data[i].genres = [];
                    }           
                    if(data[i].game_modes == undefined){
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


                    await pool.request()
                      .input("id", sql.Int, data[i].id)
                      .input("name", sql.VarChar, data[i].name )
                      .input("first_release_date", sql.Int, data[i].first_release_date)
                      .input("summary", sql.VarChar, data[i].summary)
                      .input("rating", sql.Float, data[i].rating)
                      .input("aggregated_rating", sql.Float, data[i].aggregated_rating )
                      .input("local_rating", sql.Float, data[i].total_rating)
                      .input("storyline", sql.VarChar, data[i].storyline)
                      .input("collections", sql.Int, data[i].collection)
                      .query(querys.addGame);


                      for (const element of data[i].game_modes) {
                        try{
                            await game_modes(data,i,element);
                        }
                        catch(error){
                            console.error("Error en función games modes:", error);

                        }
                    }       

                    for (const element of data[i].genres) {
                        try{
                            await generos(data,i,element);
                        }
                        catch(error){
                        }
                    } 
                    for (const element of data[i].franchises) {
                        try{
                            await franchises_game(data,i,element);
                        }
                        catch(error){
                        }
                    } 
                    
                    for (const element of data[i].player_perspectives) {
                        try{
                            await player_perspectives(data,i,element);
                        }
                        catch(error){
                        }
                    } 
                    
                    
                    for (const element of data[i].themes) {
                        try{
                            await themes(data,i,element);
                        }
                        catch(error){
                        }
                    } 
                    
                    
                    for (const element of data[i].platforms) {
                        try{
                            await platforms(data,i,element);
                        }
                        catch(error){
                        }
                    } 
                    
                    // for (const element of data[i].game_engines) {
                    //     try{
                    //         await game_engines(data,i,element);
                    //     }
                    //     catch(error){
                    //     }
                    // } 
           

                    console.log(data[i].id," agregado correctamente");

                }
        }
    } catch (error) {
        console.error("Error en la petición:", error);
    } finally {
        // Planificar la siguiente ejecución después de 3 segundos
        setTimeout(peticion, 2000);
    }
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
                // console.log("Generos con juegos agregados")
                resolve(true)
            });
        }
        catch(error){
        }

    });
}

async function game_modes(data,i,element) {
    return new Promise((resolve, reject) => {
        // Dentro de esta función, puedes realizar alguna operación asíncrona
        // Por ejemplo, simulemos una operación de espera de 2 segundos
        try{
                     pool.request()
                     .input("id_game", sql.Int, data[i].id)                        
                     .input("id", sql.Int, element)                      
                     .query(querys.addGame_Mode_Game) 
                     .then( async () =>  {  
                        // console.log("Modo de Juegos con juegos agregados")
                        resolve(true)
            });
                 }
                 catch(error){
                 }

    });
}

async function franchises_game(data,i,element) {
    return new Promise((resolve, reject) => {
        // Dentro de esta función, puedes realizar alguna operación asíncrona
        // Por ejemplo, simulemos una operación de espera de 2 segundos
        try{
                     pool.request()
                    .input("id_game", sql.Int, data[i].id)                        
                    .input("id", sql.Int, element)                      
                    .query(querys.addFranchise_Game) 
                     .then( async () =>  {  
                        // console.log("franquicias con juegos agregados")
                        resolve(true)
            });
                 }
                 catch(error){
                 }

    });
}


async function game_engines(data,i,element) {
    return new Promise((resolve, reject) => {
        // Dentro de esta función, puedes realizar alguna operación asíncrona
        // Por ejemplo, simulemos una operación de espera de 2 segundos
        try{
                    pool.request()
                    .input("id_game", sql.Int, data[i].id)                        
                    .input("id", sql.Int, element)                      
                    .query(querys.addGame_Engine_Game) 
                     .then( async () =>  {  
                        // console.log("Game Engine con juegos agregados")
                        resolve(true)
            });
                 }
                 catch(error){
                 }

    });
}

async function player_perspectives(data,i,element) {
    return new Promise((resolve, reject) => {
        // Dentro de esta función, puedes realizar alguna operación asíncrona
        // Por ejemplo, simulemos una operación de espera de 2 segundos
        try{
			pool.request()
			.input("id_game", sql.Int, data[i].id)
			.input("id", sql.Int, element)                      
			.query(querys.addPlayer_Perspective_Game)   
			.then( async () =>  {  
                // console.log("Perspectiva con juegos agregados")
				resolve(true)
        	});
		}
		catch(error){
		}

    });
}

async function themes(data,i,element) {
    return new Promise((resolve, reject) => {
        // Dentro de esta función, puedes realizar alguna operación asíncrona
        // Por ejemplo, simulemos una operación de espera de 2 segundos
        try{
			pool.request()
			.input("id_game", sql.Int, data[i].id)
			.input("id", sql.Int, element)                      
			.query(querys.addThemes_Game)   
			.then( async () =>  {  
                // console.log("Tema con juegos agregados")
				resolve(true)
        	});
		}
		catch(error){
		}

    });
}


async function platforms(data,i,element) {
    return new Promise((resolve, reject) => {
        // Dentro de esta función, puedes realizar alguna operación asíncrona
        // Por ejemplo, simulemos una operación de espera de 2 segundos
        try{
			pool.request()
			.input("id_game", sql.Int, data[i].id)
			.input("id", sql.Int, element)                      
			.query(querys.addPlatform_Game)   
			.then( async () =>  {  
                // console.log("Plataforma con juegos agregados")
				resolve(true)
        	});
		}
		catch(error){
		}

    });
}



// Iniciar el proceso
peticion();
