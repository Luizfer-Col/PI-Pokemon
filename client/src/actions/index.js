import axios from "axios";
import {
	GET_POKEMONS,
	GET_TYPES,
	FILTER_BY_TYPE,
	FILTER_BY_LOCALE,
	GET_DETAILS,
	GET_BY_NAME,
	POST,
     ORDER,
     SET_ORDER
} from "./names";

export function getPokemons() {
	return async function (dispatch) {
		const pokemonsJson = await axios.get(
			"http://localhost:3001/pokemons"
		);
		return dispatch({
			type: GET_POKEMONS,
			payload: pokemonsJson.data,
		});
	};
}

export function getTypes() {
	return async function (dispatch) {
		const typesJson = await axios.get("http://localhost:3001/types");
		return dispatch({
			type: GET_TYPES,
			payload: typesJson.data,
		});
	};
}

export function filterByType(payload) {
	return {
		type: FILTER_BY_TYPE,
		payload,
	};
}



export function filterByLocale(payload) {
    return {
		type: FILTER_BY_LOCALE,
		payload,
    };
};


export function getDetails(id) {
    return async function(dispatch) {
        try {
            const pokemonById = await axios.get(`http://localhost:3001/pokemons/${id}`);
            console.log(pokemonById);
            return dispatch({
			type: GET_DETAILS,
			payload: pokemonById.data
		});
        } catch (err) {
            console.log(err)
        };
    };
};




export function getByName(name) {
    return async function(dispatch) {
        try {
            const res = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type: GET_BY_NAME,
                payload: res.data
            });
        } catch (err) {
            console.log(err)
            alert("Ups! Pokemon No Encontrado");
        };
    };
};




export function addPokemon(payload) {
    return async function(dispatch) {
        const posteo = await axios.post(
			"http://localhost:3001/pokemons",
			payload
		);
        return {
			type: POST,
			posteo,
		};
    };
};


export function byOrder(payload) {
	return {
		type: ORDER,
		payload,
	};
}

export function setOrder(payload) {
	return {
		type: SET_ORDER,
		payload,
	};
}



