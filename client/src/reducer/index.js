import {
	GET_POKEMONS,
	GET_TYPES,
	FILTER_BY_TYPE,
	FILTER_BY_LOCALE,
	GET_DETAILS,
	GET_BY_NAME,
	POST,
	ORDER,
	SET_ORDER,
} from "../actions/names";

const initialState = {
	pokemons: [], // pokemones a renderizar
	allPokemons: [], // siempre todos
	types: [], // todos los tipos
	acumTypes: [], // pokemones filtrados por tipo
	acumCreated: [], // pokemones filtrados por origen
	details: [], // detalles
	detailsType: [], // los tipos de detalle en array
	ifTypeFilter: false, //  flag filtro tipo activo
	ifLocaleFilter: false, // flag filtro origen activo
	orderU: [],
	orderD: [],
	flagOrder: false,
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_POKEMONS:
			return {
				...state,
				pokemons: action.payload,
				allPokemons: action.payload, // evito filtrar sobre filtrado
			};

		case FILTER_BY_TYPE:
			var checkTypeAll = false; // flag para indicar si este filtro se activa
			let allPokemones; // esta es mi base para filtrar

			// reviso si hay otro filtro activo
			if (state.ifLocaleFilter) {
				// reviso si hay filtro por  origen activo
				allPokemones = state.acumCreated; // en ese caso tomo como base para el filtro los que arroja ese filtro
			} else {
				allPokemones = state.allPokemons; // sino filtro sobre todos
			}

			// guardo mi filtro que usare en otros filtros en caso de ser diferente de all
			let acumT;
			if (action.payload !== "All") {
				acumT = state.allPokemons.filter((p) =>
					p.types.includes(action.payload)
				);
			}

			// hago mi filtro
			let typesFilters;
			if (action.payload === "All") {
				typesFilters = allPokemones; // si es todo muestre sin filtro
			} else {
				typesFilters = allPokemones.filter((p) =>
					p.types.includes(action.payload)
				);
				checkTypeAll = true; // marco el flag indicando que tengo un filtro activo
			}

			return {
				...state,
				pokemons: typesFilters,
				acumTypes: acumT,
				ifTypeFilter: checkTypeAll,
			};

		case FILTER_BY_LOCALE:
			////valido si hay filtros anteriores y en base a eso realizo mis filtros actuales
			let checkLocaleAll = false;
			var preLocaleFilters;
			if (state.ifTypeFilter) {
				// si hay flag activo de otro filtro
				preLocaleFilters = state.acumTypes;
			} else {
				preLocaleFilters = state.allPokemons;
			}

			////guardo mi filtro
			let acumC;
			if (action.payload === "Created") {
				acumC = state.allPokemons.filter((p) => p.pokemonLocal);
			}
			if (action.payload === "Api") {
				acumC = state.allPokemons.filter(
					(p) => !p.pokemonLocal
				);
			}

			/////realizo mi filtro
			let localeFilter;
			if (action.payload === "Created") {
				localeFilter = preLocaleFilters.filter(
					(p) => p.pokemonLocal
				);
				checkLocaleAll = true;
			} else if (action.payload === "Api") {
				localeFilter = preLocaleFilters.filter(
					(p) => !p.pokemonLocal
				);
				checkLocaleAll = true;
			} else if (action.payload === "All") {
				localeFilter = preLocaleFilters;
			}

			return {
				...state,
				pokemons: localeFilter,
				acumCreated: acumC,
				ifLocaleFilter: checkLocaleAll,
			};

		case GET_TYPES:
			const typeSort = action.payload.sort();
			return {
				...state,
				types: typeSort,
			};

		case GET_DETAILS:
			const detailArr = [];
			// valido si viene en array o no pues vienen diferentes los de api y los de db, y asi envio los tipos en array
			Array.isArray(action.payload)
				? action.payload[0].types.map((t) => detailArr.push(t))
				: action.payload.types.map((t) =>
						detailArr.push(t.type)
				  );

			const pokeDetalle = Array.isArray(action.payload)
				? action.payload[0]
				: action.payload;

			return {
				...state,
				details: pokeDetalle,
				detailsType: detailArr,
			};

		case GET_BY_NAME:
			return {
				...state,
				pokemons: action.payload,
			};
		case POST:
			return {
				...state,
			};

		case SET_ORDER:
			let orderN;
			if (state.flagOrder) {
				let varToOrder = action.payload; // criterio

				if (state.orderD === "Asc") {
					orderN = state.pokemons.sort(function (a, b) {
						if (a[varToOrder] > b[varToOrder]) {
							return 1;
						}
						if (b[varToOrder] > a[varToOrder]) {
							return -1;
						}
						return 0;
					});
				} else if (state.orderD === "Desc") {
					orderN = state.pokemons.sort(function (a, b) {
						if (a[varToOrder] > b[varToOrder]) {
							return -1;
						}
						if (b[varToOrder] > a[varToOrder]) {
							return 1;
						}
						return 0;
					});
				} else {
					orderN = state.pokemons;
				}
			}
			return {
				...state,
				pokemons: orderN ? orderN : state.pokemons,
				orderU: action.payload,
			};

		case ORDER:
			let varToOrder = state.orderU;
			let orderName;
			if (action.payload === "Asc") {
				orderName = state.pokemons.sort(function (a, b) {
					if (a[varToOrder] > b[varToOrder]) {
						return 1;
					}
					if (b[varToOrder] > a[varToOrder]) {
						return -1;
					}
					return 0;
				});
			} else if (action.payload === "Desc") {
				orderName = state.pokemons.sort(function (a, b) {
					if (a[varToOrder] > b[varToOrder]) {
						return -1;
					}
					if (b[varToOrder] > a[varToOrder]) {
						return 1;
					}
					return 0;
				});
			} else {
				orderName = state.pokemons;
			}

			return {
				...state,
				pokemons: orderName,
				orderD: action.payload,
				flagOrder: true,
			};

		default:
			return state;
	}
}

export default rootReducer;
