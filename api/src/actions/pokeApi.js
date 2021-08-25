const axios = require("axios");







const getPokeApi = async () => {
	let pokePrimerosVeinte = await axios.get(
		"https://pokeapi.co/api/v2/pokemon"
	);
	let pokeSegundosVeinte = await axios.get(pokePrimerosVeinte.data.next);
	let pokeCuarenta = pokePrimerosVeinte.data.results.concat(
		pokeSegundosVeinte.data.results
	); // dejo los 40 que minimo me estan pidiendo

	try {
		const mapPokemones = pokeCuarenta.map((pokito) =>
			axios.get(pokito.url) // request de los 40, debo acceder a la url, doble request
		);
		const pokeParaMostrar = Promise.all(mapPokemones).then((poke) => {// despues de resolver las 40 promesas. Al final retornara un array con la data de las 40 promesas
			let pokeDatos = poke.map((poke) => poke.data);// tomo la data de cada una
			let arrayPokemones = [];
			pokeDatos.map((pokemon) => { //la envio a un array
				const {
					id,
					name,
					stats,
					height,
					weight,
					sprites,
					types,
                         				} = pokemon;
				arrayPokemones.push({
					id: id,
					name: name,
					height: height,
					weight: weight,
					hp: stats[0].base_stat,
					attack: stats[1].base_stat,
					defense: stats[2].base_stat,
					speed: stats[5].base_stat,
                         especial:stats[3].base_stat,
					sprite: sprites.other["official-artwork"]
						.front_default,
					types: types.map((e) => e.type.name),
				});
			});
			return arrayPokemones; // me quedo con el array con la data de los 40 
		});
		return pokeParaMostrar;
	} catch (error) {
		return error;
	}
};

module.exports = getPokeApi;
