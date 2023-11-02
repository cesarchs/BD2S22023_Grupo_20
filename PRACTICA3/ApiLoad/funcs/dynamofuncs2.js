import {db, Table} from './dynamocon.js'


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
export async function searchbyYear(FechaDeEstreno){
  console.log(FechaDeEstreno)
    const params = {
        TableName: Table,         
    };
    
// Promesa para manejar la operación asincrónica
return new Promise((resolve) => {
  // Realiza un escaneo en la tabla
  db.scan(params, (error, data) => {
    if (error) {
      console.error('Error al escanear la tabla:', error);
    } else {
        const filteredItems = data.Items.filter(item => {
            const year = item.FechaDeEstreno.split('/')[2]; // Extrae el año de la fecha
            return year === FechaDeEstreno; // Compara con el año proporcionado
        });
        resolve(filteredItems); 
    }
  });
});
}




export {
    readAllUsers

}