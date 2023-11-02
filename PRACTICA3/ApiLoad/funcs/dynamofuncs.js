import {db, Table} from './dynamocon.js'

// Create or Update users
const createOrUpdate = async (data = {}) =>{
    const params = {
        TableName: Table,
        Item: data
    }

    try{
        await db.put(params).promise()
        return { success: true }
    } catch(error){
        return { success: false}
    }
}

// Read all users
const readAllUsers = async()=>{
    const params = {
        TableName: Table
    }

    try{
        const { Items = [] } = await db.scan(params).promise()
        return { success: true, data: Items }

    } catch(error){
        console.log(error)
        return { success: false, data: null }
    }

}

// Read Users by ID
const getUserById = async (value, key = 'id') => {
    const params = {
        TableName: Table,
        Key: {
            [key]: parseInt(value)
        }
    }
    try {
        const { Item = {} } =  await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return {  success: false, data: null}        
    }
}

// Delete User by ID
const deleteUserById = async(value, key = 'id' ) => { 
    const params = {
        TableName: Table,
        Key: {
            [key]: parseInt(value)
        }
    }
        
    try {
        await db.delete(params).promise()
        return {  success: true }

    } catch (error) {
        return{ success: false }
    }
}
//
export async function listAll (){
    const params = {
        TableName: Table,
    };
    
    return new Promise( (resolve  ) => {  db.scan(params, (error, data) => {
          //console.log("llega aca")
        if (error) {
          console.error('Error al escanear la tabla:', error);
        } else {
          //console.log('Películas disponibles:', data.Items);
          // data.Items contendrá todas las películas disponibles
          resolve( data.Items)
        }
    });
    })
}

export async function searchbygenre(generoABuscar){
    const params = {
        TableName: Table,         
    };
    
    return new Promise( (resolve  ) => {  db.scan(params, (error, data) => {
          //console.log("llega aca")
        if (error) {
          console.error('Error al escanear la tabla:', error);
        } else {
          console.log('Películas disponibles:', data.Items);
          // data.Items contendrá todas las películas disponibles
          resolve( data.Items.filter(item => item.Genero === generoABuscar))
        }
    });
    })
}

export async function ListAllClasR(generoABuscar){
    const params = {
        TableName: Table,         
    };
    
    return new Promise( (resolve  ) => {  db.scan(params, (error, data) => {
          //console.log("llega aca")
        if (error) {
          console.error('Error al escanear la tabla:', error);
        } else {
          console.log('Películas disponibles:', data.Items);
          // data.Items contendrá todas las películas disponibles
          resolve( data.Items.filter(item => {
            const clasificacion = item.Calificacion;
            return clasificacion === 'R' || clasificacion === 'D' || clasificacion === 'C';
          })
          )
        }
    });
    })
}

export async function ListDirectorFilms(director){
    const params = {
        TableName: Table,         
    };
    
    return new Promise( (resolve  ) => {  db.scan(params, (error, data) => {
          //console.log("llega aca")
        if (error) {
          console.error('Error al escanear la tabla:', error);
        } else {
          console.log('Películas disponibles:', data.Items);
          // data.Items contendrá todas las películas disponibles
          resolve( data.Items.filter(item => item.director.nombre === director))
        }
    });
    })
}

export async function lowerprice15(){
    const params = {
        TableName: Table,         
    };
    
    return new Promise( (resolve  ) => {  db.scan(params, (error, data) => {
          //console.log("llega aca")
        if (error) {
          console.error('Error al escanear la tabla:', error);
        } else {
          console.log('Películas disponibles:', data.Items);
          // data.Items contendrá todas las películas disponibles
          resolve( data.Items.filter(item => item.Precio < 15))
        }
    });
    })
}

export async function topDirectores(){
    const params = {
        TableName: Table,         
    };
    
    return new Promise( (resolve  ) => {  db.scan(params, (error, data) => {
          //console.log("llega aca")
        if (error) {
          console.error('Error al escanear la tabla:', error);
        } else {         
            const directorCalificaciones = {};

            data.Items.forEach(item => {
              const director = item.director.nombre;
              const calificacion = item.Calificacion;
        
              if (!directorCalificaciones[director]) {
                directorCalificaciones[director] = {
                  totalCalificaciones: 0,
                  sumaCalificaciones: 0,
                };
              }
        
              directorCalificaciones[director].totalCalificaciones++;
              directorCalificaciones[director].sumaCalificaciones += calificacion;
            });
        
            // Calcula el promedio de calificación para cada director
            const directoresPromedio = Object.keys(directorCalificaciones).map(director => {
              const directorInfo = directorCalificaciones[director];
              return {
                director,
                promedioCalificacion: directorInfo.sumaCalificaciones / directorInfo.totalCalificaciones,
              };
            });
        
            // Ordena los directores por calificación promedio en orden descendente
            directoresPromedio.sort((a, b) => b.promedioCalificacion - a.promedioCalificacion);
        
            // Muestra los 10 mejores directores
            const mejoresDirectores = directoresPromedio.slice(0, 10);
            resolve( mejoresDirectores)
        }
    });
    })
}

export async function preciopromediio(){
    const params = {
        TableName: Table,         
    };
    
    return new Promise( (resolve  ) => {  db.scan(params, (error, data) => {
        //console.log("llega aca")
        if (error) {
            console.error('Error al escanear la tabla:', error);
        } else {

            const totalPeliculas = data.Items.length;
            let sumaPrecios = 0;
            let sumaPrecios2 = 0;
            
            data.Items.forEach(item => {
                sumaPrecios += item.Precio;
                sumaPrecios2 += item.Precio2;
            });
            
            const precioPromedio = sumaPrecios / totalPeliculas;
            const precioPromedio2 = sumaPrecios2 / totalPeliculas;
            
            resolve( {precioPromedio1: precioPromedio, precioPromedio2: precioPromedio2})
        }
    });
})
}

export async function sortbycalification(){
    const params = {
        TableName: Table,         
    };
    
    return new Promise( (resolve  ) => {  db.scan(params, (error, data) => {
          //console.log("llega aca")
        if (error) {
          console.error('Error al escanear la tabla:', error);
        } else {         
             // Procesa los datos para calcular el promedio de calificación por película
                const peliculasConPromedio = data.Items.map(item => {
                    const calificacion = item.Calificacion;
                    return {
                    ...item,
                    promedioCalificacion: calificacion,
                    };
                });
            
                // Ordena las películas por calificación promedio de mayor a menor
                peliculasConPromedio.sort((a, b) => b.promedioCalificacion - a.promedioCalificacion);
  
            resolve( peliculasConPromedio)
        }
    });
    })
}


export {
    createOrUpdate,
    readAllUsers,
    getUserById,
    deleteUserById,
    
}
