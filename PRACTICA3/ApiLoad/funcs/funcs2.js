import {readAllUsers,searchbyYear } from './dynamofuncs2.js'

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


export async function SearchGYearPelicula(req, res) {
    console.log(req.params.FechaDeEstreno)
    try {
        const data = await searchbyYear(req.params.FechaDeEstreno).then((data) => {
            console.log(data)
            res.send(data)
        })        
    } catch (error) {
        res.status(500).json(error)
    }
}