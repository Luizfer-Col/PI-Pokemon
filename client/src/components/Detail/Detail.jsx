import React, { useEffect, useState } from "react";
import Style from "./Detail.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../actions";
import { Link } from "react-router-dom";

function Detail(props) {
	const [loading, setLoading] = useState(false);
	const details = useSelector((state) => state.details);
	const detailsType = useSelector((state) => state.detailsType);
	const dispatch = useDispatch();
	const { id } = props.match.params;
	const idToShow = id?.length > 5 ? `C${id.slice(0, 3)}` : id;
	useEffect(() => {
		dispatch(getDetails(id));
		setLoading(true);
	}, [id, dispatch]);

	return (
		<div className="detail">
			{!loading ? (
				<div>
					<h3>....Loading</h3>
				</div>
			) : (
				<div className={Style.card}>
					<Link to="/home">
						<button className={Style.cerrar}>x</button>
					</Link>

					<div className={Style.containerImg}>
						<img
							className={Style.imgDetails}
							src={details.sprite}
							alt="Not found"
						></img>
					</div>

					<div className={Style.containerInfo}>
						<div className={Style.contPpal}>
							<h1 className={Style.nameP}>
								{details["name"]}
							</h1>
							<h2 className={Style.nameP}>
								ID: {idToShow}
							</h2>

							<h4 className={Style.tiposDet}>
								TIPOS
							</h4>
							<div className={Style.tiposDetH5}>
								{detailsType?.map((t) => (
									<h5>{t}</h5>
								))}
							</div>
						</div>

						<div className={Style.allDetails}>
							{/* <h3>status</h3> */}

							<div className={Style.hp}>
								<h4>SALUD</h4>
								<h4>{details.hp}</h4>
							</div>
							<div className={Style.hp}>
								<h4>VELOCIDAD</h4>
								<h4>{details.speed}</h4>
							</div>
							<div className={Style.hp}>
								<h4>ATAQUE</h4>
								<h4>{details.attack}</h4>
							</div>

							<div className={Style.hp}>
								<h4>ALTURA</h4>
								<h4>{details.height}</h4>
							</div>

							<div className={Style.hp}>
								<h4>PESO</h4>
								<h4>{details.weight}</h4>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Detail;
