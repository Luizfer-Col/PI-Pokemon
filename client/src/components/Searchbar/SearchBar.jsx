import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../actions";
import Style from "./SearchBar.module.css";

export default function SearchBar() {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(getByName(name));
		setName("");
	}
	function handleChange(e) {
		e.preventDefault();
		setName(e.target.value);
	}

	return (
		<div className={Style.search}>
			<input
				type="text"
				className={Style.buscar}
				value={name}
				placeholder="Buscar Pokemón"
				onChange={(e) => handleChange(e)}
			></input>
			<button
				className={Style.btnBuscar}
				type="submit"
				onClick={(e) => {
					handleSubmit(e);
					setName("");
				}}
			>
				Buscar
			</button>
		</div>
	);
}
