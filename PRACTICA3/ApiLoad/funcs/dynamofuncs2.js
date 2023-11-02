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


export async function searchByWord(keyword){
    console.log(keyword)
    
      const params = {
          TableName: Table,
          FilterExpression: 'contains (Titulo, :keyword) or contains (Descripcion, :keyword)',  
          ExpressionAttributeValues: {
            ':keyword': keyword
          }    
      };
      
      return new Promise((resolve, reject) => {
        db.scan(params, (error, data) => {
          if (error) {
            console.error('Error al realizar el escaneo:', error);
            reject(error); // Rechaza la promesa si hay un error
          } else {
            resolve(data.Items); // Resuelve la promesa con los ítems que cumplen con la condición "LIKE"
          }
        });
      });
    }



export {
    readAllUsers

}