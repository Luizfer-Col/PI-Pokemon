const axios = require("axios"); // aqui no utilice axios
const { Router } = require("express");
const router = Router();
const getPokeAll = require('../actions/pokeTotal')

const prueba = { 1: 2 };

router.get("/", async function (req, res) {
     const {name} = req.query // me traigo el posible name que m hayan pasado
	const  pokemonesTodos = await getPokeAll(); // traigo todos los pokemones desde la funcion importada
     if (!name){ // valido si no hay un name pasado envio todos lo poekmones solicitados
          res.json(pokemonesTodos); 
     } else { // si hay un name debo filtrarlo de todos mis pokemones
          const pokeName = await pokemonesTodos.filter((pokemon) =>
			pokemon.name.toLowerCase() === (name.toLowerCase()) // importante comparo en minusculas para evitar errores de comparacion por mayusc
		);
		pokeName.length // si el filtro me devolvio algo  lo envío, sino envío mensaje de error
			? res.status(200).send(pokeName)
			: res.status(404).send("Ups! Ningún Pokemón tiene ese nombre");
     }


});


module.exports = router;
