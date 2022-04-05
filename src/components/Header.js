import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
    const token = localStorage.getItem('token');

    return(
        <div className='header'>
            <p>Reciperts</p>
            <ul className='nav'>
                {!token && <li><Link to="/login">Login</Link></li>}
                {!token && <li><Link to="/signup">Signup</Link></li>}
                {token && <li><Link to="/dashboard">Dashboard</Link></li>}
                {/* {token && <li><Link to="/profile">Edit Profile</Link></li>} */}
                {token && <li><Link to="/logout">Logout</Link></li>}
            </ul>
        </div>
    );
}

export default Header;
