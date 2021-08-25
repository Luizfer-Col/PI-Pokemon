import React from 'react'
import { Link } from "react-router-dom";
import Style from "./NavBar.module.css"


export default function NavBar() {
     return (
		<div className={Style.fondo}>
			<div className={Style.containerNav}>
				<img
					src="https://sites.google.com/site/pokestatsmaes/_/rsrc/1582217989272/config/customLogo.gif?revision=3"
					alt="logo"
				/>
				{/* <br /> */}
				<Link to="/home">HOME</Link>

				<Link to="/home/create">CREA TU POKEMON</Link>
			</div>
		</div>
     );
}
