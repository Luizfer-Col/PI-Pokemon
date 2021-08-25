const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemons = require("./pokemons.js");
const idPokemon = require("./idPokemon.js");
const createPokemon = require("./createPokemon");
const types = require("./types");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemons); 
router.use('/pokemons', idPokemon);
router.use('/pokemons', createPokemon);
router.use('/', types);


module.exports = router;
