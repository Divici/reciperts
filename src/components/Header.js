import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/recipertsLogo.png'

const Header = () => {
    const token = localStorage.getItem('token');

    return(
        <header className='flex items-center justify-between px-2 py-5 mb-10'>
                <Link to="/" className='py-1 px-2 sm:ml-10 lg:ml-24 mr-auto'>
                    <img className='w-24' src={logo} alt="logo"/>
                </Link>
                <nav className='flex sm:mr-10 lg:mr-24'>
                    {!token && <Link to="/login" className='text-slate-600 font-bold py-1 px-2 border-b-2 border-b-transparent transition hover:border-b-2 hover:border-b-main hover:text-main'>
                        Login</Link> }
                    {!token && <Link to="/signup" className='text-slate-600 font-bold py-1 px-2 border-b-2 border-b-transparent transition hover:border-b-2 hover:border-b-main hover:text-main'>
                        Signup</Link> }
                    {token && <Link to="/dashboard" className='text-slate-600 font-semibold py-1 px-2 border-b-2 border-b-transparent transition hover:border-b-2 hover:border-b-main hover:text-main'>
                        Dashboard</Link> }
                    {/* {token && <li><Link to="/profile">Edit Profile</Link></li>} */}
                    {token && <Link to="/logout" className='text-slate-600 font-semibold py-1 px-2 border-b-2 border-b-transparent transition hover:border-b-2 hover:border-b-main hover:text-main'>
                        Logout</Link> }
                </nav>
        </header>

    );
}

export default Header;
