const axios = require("axios")
const { Router } = require("express");
const { conn, Pokemon, Type } = require('../db');
const router = Router();

router.get("/types", async function (req, res) {
     const tipos = await axios.get("https://pokeapi.co/api/v2/type");// peticion a la api
     const mapTypos = tipos.data.results.map(tipo =>tipo.name) // me quedo solo con los nombres

         mapTypos.forEach((i) => {
			Type.findOrCreate({
				where: {
					type: i,
				},
			});
		}); //buscar o crear si no esta
		const allTypes = await Type.findAll();

	res.send(allTypes);
});


module.exports = router;