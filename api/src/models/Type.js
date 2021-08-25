const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	const { STRING } = DataTypes;
	sequelize.define("type", {
		type: {
			type: STRING,
		},

	});
},{timestamps: false,}

