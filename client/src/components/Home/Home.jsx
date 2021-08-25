import React, { Fragment, useState, useEffect } from "react";
import Style from "./Home.module.css";

import  ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	filterByLocale,
	filterByType,
	getPokemons,
	getTypes,
     byOrder,
     setOrder
} from "../../actions";
import Card from "../Card/Card";
import SearchBar from "../Searchbar/SearchBar";

export default function Home() {
	const dispatch = useDispatch(); /// este es el equivalente al mapDispatchToProps
	const allPokemons = useSelector((state) => state.pokemons); // equivalente al  mapStatesToProps

	const allTypes = useSelector((state) => state.types); // equivalente al  mapStatesToProps // los tipos
	const sortTypes = allTypes.map((p) => p.type); // aqui los ordeno

	//estados orden
	const [myOrderNf, setMyOrderNf] = useState("");
	const [myOrderAd, setMyOrderAd] = useState("");

	//estados filtros
	const [valueTipo, setValueTipo] = useState("");
	const [valueLocal, setValueLocal] = useState("");

	//paginado
	const PER_PAGE = 8;
	const [currentPage, setCurrentPage] = useState(0);
	const pageCount = Math.ceil(allPokemons.length / PER_PAGE);
	let offset = currentPage * PER_PAGE;
     

	useEffect(() => {
		dispatch(getPokemons());
		dispatch(getTypes());
		handlePageClick({ selected: 0 });
	}, [dispatch]);

	///cambia de pagina
	function handlePageClick({ selected: selectedPage }) {
		setCurrentPage(selectedPage);
	}

	///  boton resetear filtro
	function handleClick(e) {
		e.preventDefault();
		dispatch(filterByType("All"));
		dispatch(filterByLocale("All"));
		setValueTipo("");
		setValueLocal("");
		setMyOrderNf("");
		setMyOrderAd("");
		dispatch(getPokemons());
	}

	/// filtro por tipos
	function handleFilterTypes(e) {
		setValueTipo(e.target.value);
		dispatch(filterByType(e.target.value));
		dispatch(setOrder(myOrderNf));
		dispatch(byOrder(myOrderAd));
		handlePageClick({ selected: 0 });
	}

	///filtro por origen
	function handleFilterLocale(e) {
		setValueLocal(e.target.value);
		dispatch(filterByLocale(e.target.value));
		dispatch(setOrder(myOrderNf));
		dispatch(byOrder(myOrderAd));
		handlePageClick({ selected: 0 });
		// handleNextPage();
	}

	///selecciono el tipo de orden
	function handleSetOrder(e) {
		e.preventDefault();
		dispatch(setOrder(e.target.value));
		// dispatch(byOrder(myOrderNf));
		handlePageClick({ selected: 0 });
		setMyOrderNf(e.target.value);
	}

	///selecciono el modo de orden

	function handleOrder(e) {
		e.preventDefault();
		dispatch(byOrder(e.target.value));
		handlePageClick({ selected: 0 });
		setMyOrderAd(e.target.value);
	}


     //// elemento que contiene el renderizado de pokemones
	const currentPageData = allPokemons
		?.slice(offset, offset + PER_PAGE)
		.map((pok) => {

               ////manipulo los tipos para que se vean como lista 
			const typesToShow = Array.isArray(pok.types)
				? pok.types.map((t) => {
						return (
							<p className={Style.pCard} key={t.id}>
								{t.toUpperCase()}
							</p>
						);
				  })
				: pok.types?.sort();

			return (
				<Fragment>
					<>
						<Link to={"/home/pokemones/" + pok.id}>
							<Card
								name={pok.name}
								attack={pok.attack}
								sprite={pok.sprite}
								types={typesToShow}
							/>
						</Link>
					</>
				</Fragment>
			);
		});

	////comienza el render
	return (
		<div>
			{/* BARRA DE BUSQUEDA */}
			<br />
			<SearchBar />
			<br />
			{/* filtros */}
			<div className={Style.homePpal}>
				<div className={Style.TodosLosFIltros}>
					{/* filtro por tipo */}
					<label
						htmlFor="filtroTipo"
						className={Style.letras}
					>
						&nbsp;Filtrar
					</label>
					<select
						className={Style.selectTodos}
						name="filtroTipo"
						value={valueTipo}
						onChange={(e) => handleFilterTypes(e)}
					>
						<option value="All">Todos</option>
						{sortTypes?.sort().map((t) => (
							<option
								value={t}
								key={t.id}
							>{`${t}`}</option>
						))}
					</select>
					{/* filtro por origen */}
					<label htmlFor="origen"></label>
					<select
						className={Style.selectTodos}
						name="origen"
						value={valueLocal}
						onChange={(e) => handleFilterLocale(e)}
					>
						<option value="All">Todos</option>
						<option value="Created">
							Mis Pokemones
						</option>
						<option value="Api">
							Pokemones Leyenda
						</option>
					</select>
					{/* ORDENADOS */}
					<span className={Style.letras}>
						&nbsp; Ordenar
					</span>

					<select
						className={Style.selectTodos}
						value={myOrderNf}
						onChange={(e) => handleSetOrder(e)}
					>
						<option value="" disabled selected>
							Ordenar Por
						</option>
						<option value="name">Por Nombre</option>
						<option value="attack">Por Ataque</option>
						{/* <option value="id">Por Id</option> */}
					</select>
					<select
						className={Style.selectTodos}
						value={myOrderAd}
						onChange={(e) => handleOrder(e)}
					>
						<option value="" disabled selected>
							Orden
						</option>
						<option value="Asc">Ascendente</option>
						<option value="Desc">Descendente</option>
					</select>
					{/* BOTON RESETEO */}
					<button
						className={Style.resetBtn}
						onClick={(e) => {
							handleClick(e);
						}}
					>
						Resetear Filtro
					</button>
				</div>

				{/* CONTENEDOR DE POKEMONES */}
				<div className={Style.table}>{currentPageData}</div>

				{/* PAGINADO */}
				<ReactPaginate
					onPageChange={handlePageClick}
					pageCount={pageCount}
					previousLabel={"← Anterior"}
					nextLabel={"Siguiente →"}
					containerClassName={Style.pagination}
					previousLinkClassName={Style.pagination__link}
					nextLinkClassName={Style.pagination__link}
					disabledClassName={Style.pagination__linkDisabled}
					activeClassName={Style.pagination__linkActive}
				/>
			</div>
		</div>
	);
}
