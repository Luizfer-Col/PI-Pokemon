const {  Pokemon, Type } = require("../db");
// como este es el que obtiene de la db es el unico que requiere importar la db
const getPokeDb = async () => {
     
     return await Pokemon.findAll({
		// traigo todos los que tengo en la db
		include:  {model: Type}
          
     });
};


module.exports= getPokeDb;

