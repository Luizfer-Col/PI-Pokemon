import React from 'react'
import { Link } from "react-router-dom";
import Style from "./Landing.module.css";

export default function Landing() {
     return (
		<div className={Style.landing}>
			<div className={Style.landingInner}>
				<div className={Style.content}>
					{/* <h2>Pokemon! The page.....</h2> */}
					<Link to="/home">
						<h2 className={Style.go}>GO!</h2>
						{/* <button>WELCOME</button> */}
					</Link>
				</div>

			</div>
		</div>
     );
}
