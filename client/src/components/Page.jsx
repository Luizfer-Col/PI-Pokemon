// import React, { useState, useSelector, Fragment } from "react";
// import ReactPaginate from "react-paginate";
// import { Link } from "react-router-dom";
// import Card from "./Card";


// export default function Page() {
// 	const PER_PAGE = 10;
// 	const allPokemons = useSelector((state) => state.pokemons); // equivalente al  mapStatesToProps

// 	const [currentPage, setCurrentPage] = useState(0);
// 	const pageCount = Math.ceil(allPokemons.length / PER_PAGE);
// 	const offset = currentPage * PER_PAGE;

// 	function handlePageClick({ selected: selectedPage }) {
// 		setCurrentPage(selectedPage);
// 	}
//      	const currentPageData = allPokemons
// 		?.slice(offset, offset + PER_PAGE)
// 		.map((pok) => {
// 			return (
//                     <Fragment>
//                          {currentPageData}
// 					<Link to={"/home/" + pok.id}>
// 						<Card
// 							name={pok.name}
// 							sprite={pok.sprite}
// 							types={pok.types}
// 						/>
// 					</Link>
// 				</Fragment>
// 			);
// 		});

// 	return (
// 		<div>
// 			<ReactPaginate
// 				onPageChange={handlePageClick}
// 				pageCount={pageCount}
// 				previousLabel={"← Anterior"}
// 				nextLabel={"Siguiente →"}
// 				// containerClassName={"pagination"}
// 				// previousLinkClassName={"pagination__link"}
// 				// nextLinkClassName={"pagination__link"}
// 				// disabledClassName={"pagination__link--disabled"}
// 				// activeClassName={"pagination__link--active"}
// 			/>
// 		</div>
// 	);
// }
