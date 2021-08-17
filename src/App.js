import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AdminLogin from './components/AdminLogin';
import Login from './components/Login';
import Registeration from './components/Registeration';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';

function App() {
	const userdetails = JSON.parse(sessionStorage.getItem('logged-user'));

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/">
						<Login />
					</Route>
					<Route exact path="/register">
						<Registeration />
					</Route>
					<Route exact path="/admin">
						 <AdminLogin />
					</Route>
					<Route exact path="/dashboard">
						{userdetails && userdetails.auth  && <AdminDashboard />}
					</Route>
					<Route exact path="/home">
						{sessionStorage.getItem('logged-user') && <Home />}
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
