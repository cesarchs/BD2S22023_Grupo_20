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

export {
    createOrUpdate,
    readAllUsers,
    getUserById,
    deleteUserById,
    
}