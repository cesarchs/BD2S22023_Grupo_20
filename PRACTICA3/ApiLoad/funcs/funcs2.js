import { deleteUserById, getUserById, readAllUsers } from './dynamofuncs.js'

export  async function  getallPelis (req, res){

    console.log('insert - peliculas');
    try{
        const { success, data } = await readAllUsers()

        if(success){
            return res.json({success, data})
        }
        return res.status(500).json({success:false, messsage: "Error"})
       
    }catch(error){
        console.error('Error al conectar a MongoDB:', error);
    }
    
}