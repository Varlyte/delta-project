import { NavLink } from 'react-router-dom';

export default function Header(props) {

	function deleteToken() {
		sessionStorage.removeItem('token');
	}

	return (
		<header className='App-header'>
			<p>ESIEA INTECH | Fullstack project | developpé par MAITROT Maxime et MARI Lucas </p>
			<nav>
				<NavLink to='/' onClick={deleteToken}>Log out</NavLink>
			</nav>
		</header>
	)
}