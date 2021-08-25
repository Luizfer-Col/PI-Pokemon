import React from "react";
import Style from "./Card.module.css";

export default function Card({ name, types, sprite, attack, id , especial}) {
	// console.log(attack)
	return (
		<>
			<div className={Style.card} key={id}>
				<h3>{name.toUpperCase()}</h3>

				<div className={Style.imgPpal}>
					<img src={sprite} alt="imagen"></img>
				</div>

				<div className={Style.cardName}>
					<div className={Style.tipos}>
						<h5 className={Style.tiposH5} key={id}>
							{types}
						</h5>
					</div>
					<div className={Style.attack}>
						<h5 className={Style.powerT}>ATAQUE</h5>

						<h5 className={Style.power}> {attack}</h5>
					</div>
				</div>
			</div>
		</>
	);
}
