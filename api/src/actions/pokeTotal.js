const getPokeApi = require("./pokeApi");
const getPokeDb = require("./pokeDb");

const getPokeAll = async () => {
	const losDeApi = await getPokeApi();
	const losDeDb = await getPokeDb();
	const losDeDeb = [];

	const mapeoDb = losDeDb.map((p) => {
		const {
			id,
			name,
			height,
			weight,
			hp,
			attack,
			defense,
			speed,
			sprite,
			pokemonLocal,
			types,
		} = p.dataValues;
		losDeDeb.push({
			id,
			name,
			height,
			weight,
			hp,
			attack,
			defense,
			speed,
			sprite,
			pokemonLocal,
			types: types.map((p) => p.dataValues.type), // aqui manipulo los tipos para verlos como un array
		});
	});

	const pokeUnidos = losDeDeb.concat(losDeApi);

	return pokeUnidos;
};

module.exports = getPokeAll;
