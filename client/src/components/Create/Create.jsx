import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPokemon, getTypes } from "../../actions/index.js";
import Style from "./Create.module.css";


export default function Create() {
	const dispatch = useDispatch();
	const history = useHistory();
	const types = useSelector((state) => state.types);

	const [myTypeSelect, setMyTypeSelect] = useState("");


	const [input, setInput] = useState({
		name: "",
		height: "",
		weight: "",
		hp: "",
		attack: "",
		defense: "",
		speed: "",
		sprite: "",
		type: [],
	});



	function handleChange(e) {
         
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});

	}



     function handleSelect(e) {

          if(input.type.includes(e.target.value)===false){
		setInput({
			...input,
			type: [...input.type, e.target.value],
		});
               setMyTypeSelect(e.target.value)
     }
     }

     function handleSubmit(e) {
		e.preventDefault();
          console.log("input", input);
          if(input.name.length <1){
               alert("Introduce todos los datos")
          } else{
		dispatch(addPokemon(input));
		alert("Pokemon creado!");
		setInput({
			name: "",
			height: "",
			weight: "",
			hp: "",
			attack: "",
			defense: "",
			speed: "",
			sprite: "",
			type: [],
		});
		history.push("/home");
          }

     }

     function handleDelete(e){
          console.log(e)
          // e.preventDefault();
          setInput({
			...input,
			type: input.type.filter((type) => type !== e),
		});
          setMyTypeSelect("");
     }

     function handleClear(){
	setInput({
		name: "",
		height: "",
		weight: "",
		hp: "",
		attack: "",
		defense: "",
		speed: "",
		sprite: "",
		type: [],
	});
     setMyTypeSelect("")

     }

     useEffect(() => {
		dispatch(getTypes());
     }, [dispatch]);


	return (
		<div>
			<form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<Link to="/home">
					<button className={Style.cerrar}>x</button>
				</Link>
				<h1 className={Style.titulo}>Crea tu Pokemon</h1>
				<div className={Style.opcionesForm}>
					{/* <label>Nombre:</label> */}
					<input
						type="text"
						value={input.name}
						placeholder="Nombre"
						name="name"
						onChange={(e) => handleChange(e)}
						required
					></input>
					{/* <span className={Style.placeholder}>Nombre</span> */}
				</div>
				<div>
					{/* <label>Altura:</label> */}
					<input
						type="number"
						value={input.height}
						placeholder="Altura"
						name="height"
						onChange={(e) => handleChange(e)}
						required
					></input>
				</div>
				<div>
					{/* <label>Peso:</label> */}
					<input
						type="number"
						value={input.weight}
						placeholder="Peso"
						name="weight"
						onChange={(e) => handleChange(e)}
						required
					></input>
				</div>
				<div>
					{/* <label>Salud:</label> */}
					<input
						type="number"
						value={input.hp}
						placeholder="Salud"
						name="hp"
						onChange={(e) => handleChange(e)}
						required
					></input>
				</div>
				<div>
					{/* <label>Ataque:</label> */}
					<input
						type="number"
						value={input.attack}
						placeholder="Ataque"
						name="attack"
						onChange={(e) => handleChange(e)}
						required
					></input>
				</div>
				<div>
					{/* <label>Defensa:</label> */}
					<input
						type="number"
						value={input.defense}
						placeholder="Defensa"
						name="defense"
						onChange={(e) => handleChange(e)}
						required
					></input>
				</div>
				<div>
					{/* <label>Velocidad:</label> */}
					<input
						type="number"
						value={input.speed}
						placeholder="Velocidad"
						name="speed"
						onChange={(e) => handleChange(e)}
						required
					></input>
				</div>
				<div>
					{/* <label>Imagen:</label> */}
					<input
						type="text"
						value={input.sprite}
						placeholder="Imagen (opc)"
						name="sprite"
						onChange={(e) => handleChange(e)}
						
					></input>
				</div>
				<div className={Style.tiposForm}>
					{/* <h3>Tipos </h3> */}

					<select
						className={Style.selectCss}
						onChange={(e) => handleSelect(e)}
						// required
						value={myTypeSelect}
					>
						<option value="">
							Selecciona el Tipo ↓
						</option>
						{types.map((i) => (
							<option value={i.type}>
								{i.type}
							</option>
						))}
					</select>
				</div>
				<div className={Style.containerTipos}>
					{input.type?.map((i) => {
						if (i.length > 0)
							return (
								<div className={Style.btnTipo}>
									<button
										className={
											Style.btnDelTipo
										}
										onClick={() =>handleDelete(i)
										}
									>
										x
									</button>
									<p
										className={
											Style.detTipo
										}
									>
										{i}
									</p>
								</div>
							); return ""
					})}
				</div>
				<div>
					<br />
					<button
						onClick={handleClear}
						className={Style.clean}
					>
						Limpiar
					</button>
					<button type="submit" className={Style.enviar}>
						Crear
					</button>
				</div>
			</form>
		</div>
	);
}
