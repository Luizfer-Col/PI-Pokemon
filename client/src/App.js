import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Landing from "./components/Landing/Landing";
import Detail from "./components/Detail/Detail";
import NavBar from "./components/Navbar/NavBar";
import Create from "./components/Create/Create";
function App() {
	return (
		<BrowserRouter>
			<>
				<div className="App">

					<div>
						<Route path="/home" component={NavBar} />
					</div>
					<Route exact path="/" component={Landing} />
					<Route exact path="/home" component={Home} />
					<Route
						exact
						path="/home/pokemones/:id"
						component={Detail}
					/>
					<Route
						exact
						path="/home/Create"
						component={Create}
					/>
				</div>
			</>
		</BrowserRouter>
	);
}

export default App;
