const axios = require("axios")
const { Router } = require("express");
const { conn, Pokemon, Type, pokemon_type } = require("../db");
const router = Router();

router.get("/:id", async function (req, res, next) {
	const { id } = req.params; // el id llega por params
       try {
			if (id.length > 5) { // valido si el id es uuid y lo busco en mi  base de datos
				const idPokeLocal = await Pokemon.findOne({
					where: {
						id: id,
					},
					include: [
						{
							model: Type,
							through: pokemon_type,
						},
					],
				});
				if (idPokeLocal) { // si lo encuentro lo muestro
					const PokeLocalDatos = idPokeLocal.dataValues;
					res.status(200).send(PokeLocalDatos);
				} else {
					res.json("Pokemon no encontrado");
				}
			} else {
				const { data } = await axios.get( // si no lo encuentro local, hago peticion a la Api, objeto llega con un "data"
					`https://pokeapi.co/api/v2/pokemon/${id}`
				);

				const { name, height, weight, stats, sprites, types } =
					data; // del data extraigo los datos
				const pokeIdToShow = [];
				pokeIdToShow.push({
					id: data.id,
					name: name,
					height: height,
					weight: weight,
					hp: stats[0].base_stat,
					attack: stats[1].base_stat,
					defense: stats[2].base_stat,
					speed: stats[5].base_stat,
					sprite: sprites.other["official-artwork"]
						.front_default,
					types: types.map((e) => e.type.name),
				});

				return res.status(200).send(pokeIdToShow);
			}
		} catch (error) {
			res.status(500).send("Nooooo!Id");
		}
	

});





// router.get("/:id", async function (req, res) {
// 	const pokeId = req.params.id; //llega como STRING!!

// 	// console.log(pokeId, "aca");
//      // if (pokeId.slice(0, 2) == "db") {
// 	if (pokeId.length >5) {
//           try {
//                  const pokeDb = await Pokemon.findOne({
// 				where: {
// 					id: pokeId,
// 				},
// 				include: [
// 					{
// 						model: Type,
// 						through: pokemon_type,
// 					},
// 				],
// 			});
// 			// let pokeDb = await Pokemon.findByPk(pokeId, { include: Type });

// 			if (pokeDb) {
// 				//Procesado para el front//
// 				pokeDb = pokeDb.dataValues; //se queda solo con el dataValues
// 				pokeDb.types = pokeDb.Type.map((e) => e.type); //crea el tipes a partir del Types
// 				{
// 					["createdAt", "updatedAt", "Type"].forEach(
// 						(e) => delete pokeDb[e]
// 					);
// 				} //elimina lo que sobra
// 				console.log("||||", pokeDb);
// 				//////////////////////////
// 				res.json(pokeDb);
// 			} else res.json("Pokemon no encontrado");
//           } catch (error) {
//                	res.status(500).send("Nooooo!Id");
//           }
		                  
// 	} else {
// 		axios.get("https://pokeapi.co/api/v2/pokemon/" + pokeId)

// 			.then((response) => {
// 				let pokemon = response.data;
// 				let estadisticas = pokemon.stats;

// 				res.json({
// 					id: pokemon.id,
// 					name: pokemon.name,
// 					types: pokemon.types.map((e) => e.type.name),
// 					imagen: pokemon.sprites.other["official-artwork"]
// 						.front_default,

// 					vida: estadisticas[0].base_stat,
// 					fuerza: estadisticas[1].base_stat,
// 					defensa: estadisticas[3].base_stat,
// 					velocidad: estadisticas[5].base_stat,

// 					altura: pokemon.height,
// 					peso: pokemon.weight,
// 				});
// 			})

// 			.catch((error) =>
// 				res
// 					.status(500)
// 					.send(  "Ups!Id" )
// 			);
// 	}

// 	/* pokemon.sprites.other.official-artwork.front_default */
// });






module.exports = router;