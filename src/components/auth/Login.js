import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from "../Header";
import '../../styles/Auth.css';

const Login = (props) => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.id] : e.target.value
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('https://reciperts.herokuapp.com/api/auth/login', credentials)
            .then(resp=>{
                localStorage.setItem('token', resp.data.token);
                localStorage.setItem('user_id', resp.data.user_id)
                navigate(`/dashboard`);
            })
            .catch(err=>{
                setError(err.response.data.message)
            })
    }

    return (
        <div className="min-h-screen">
            <Header/>
            <div className="flex items-center justify-center ">
                <div className="px-32 py-20 mt-24 text-center sm:text-left bg-white shadow-2xl">

                    <h3 className="text-xl sm:text-4xl md:text-4xl mb-12 font-bold text-center text-main">Login to your account</h3>
                    
                    <form className="mt-8" onSubmit={handleLogin}>
                        <div className="">
                            <div>
                                <label className="block mt-4" htmlFor='username'>Username</label>
                                <input
                                    className="w-full px-4 py-2 text-center mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-main"
                                    type='text'
                                    placeholder="Username"
                                    id="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block mt-4" htmlFor='password'>Password</label>
                                <input
                                    className="w-full px-4 py-2 text-center mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-main"
                                    type='password'
                                    placeholder="Password"
                                    id="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            {error && <p className="mt-4 text-sm text-center tracking-wide text-red-600">{error}</p>}

                            <div className="text-center">
                                <button className="px-6 py-2 mt-8 text-white font-medium transition bg-primary rounded-lg hover:bg-orange-400">Login</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login;