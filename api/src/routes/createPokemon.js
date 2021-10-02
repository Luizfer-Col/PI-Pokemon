// const axios = require("axios")
const { Router } = require("express");
const { conn, Pokemon, Type } = require("../db");
const router = Router();

router.post("/", async function (req, res) {
	// lo que recibo del body
	const {
		name,
		height,
		weight,
		hp,
		attack,
		defense,
		speed,
		sprite,
		pokemonLocal,
		type,
	} = req.body;

	//defino imagen predefinidia por si no me pasan una imagen
	const imagen = sprite
		? sprite
		: "https://image.flaticon.com/icons/png/512/188/188918.png";
	const crearPokemon = await Pokemon.create({
		name: name.toLowerCase(), // envio en minuscula para evitar fallos en filtros
		height,
		weight,
		hp,
		attack,
		defense,
		speed,
		sprite: imagen,
		pokemonLocal,
	});

	// busco los tipos y los uno a
	const tiposHallados = await Type.findAll({
		where: {
			type: type,
		},
	}); // ojo los tipos no quedan como array, quedan como objetos, se debe manipular mas adelante

	const idTypes = tiposHallados.map((t) => {
		return t.id;
	});

	const pokeWithType = await crearPokemon.addType(idTypes);
	return res.status(200).send(pokeWithType);
});

module.exports = router;
