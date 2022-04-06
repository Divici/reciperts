import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/recipertsLogo.png'

const Header = () => {
    const token = localStorage.getItem('token');

    return(
        <header className='flex items-center justify-between px-2 py-5 mb-10'>
                <Link to="/" className='py-1 px-2 ml-10 mr-auto'>
                    <img className='w-24' src={logo} alt="logo"/>
                </Link>
                <nav className='flex mr-10'>
                    {!token && <Link to="/login" className='text-main font-bold py-1 px-2 border-b-2 border-b-transparent transition hover:border-b-2 hover:border-b-main'>
                        Login</Link> }
                    {!token && <Link to="/signup" className='text-main font-bold py-1 px-2 border-b-2 border-b-transparent transition hover:border-b-2 hover:border-b-main'>
                        Signup</Link> }
                    {token && <Link to="/dashboard" className='text-main font-bold py-1 px-2 border-b-2 border-b-transparent transition hover:border-b-2 hover:border-b-main'>
                        Dashboard</Link> }
                    {/* {token && <li><Link to="/profile">Edit Profile</Link></li>} */}
                    {token && <Link to="/logout" className='text-main font-bold py-1 px-2 border-b-2 border-b-transparent transition hover:border-b-2 hover:border-b-main'>
                        Logout</Link> }
                </nav>
        </header>

    );
}

export default Header;
