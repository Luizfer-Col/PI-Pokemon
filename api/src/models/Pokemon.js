const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const {UUID, STRING, INTEGER } = DataTypes;
  sequelize.define("pokemon", {
		id: {
			type: UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: STRING,
			allowNull: false,
		},
		height: {
			type: INTEGER,
		},
		weight: {
			type: INTEGER,
		},
		hp: {
			type: INTEGER,
		},
		attack: {
			type: INTEGER,
		},
		defense: {
			type: INTEGER,
		},
		speed: {
			type: INTEGER,
		},
		sprite: {
			type: STRING,
		},
		pokemonLocal: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
  });
};





