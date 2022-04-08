import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from "../Header";

const Signup = (props) => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [success, setSuccess] = useState(false);

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.id] : e.target.value
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        
        axios.post('https://reciperts.herokuapp.com/api/auth/register', credentials)
            .then(resp=>{
                    setSuccess(!success);
                    const timer = setTimeout(() => {
                        setSuccess(!success)
                        navigate('/login');
                    }, 2000);
            })
            .catch(err=>{
                setError(err.response.data.message)
            })
    }

    return (
        
        <div className="min-h-screen">
            <Header/>
            <div className="flex items-center justify-center mx-auto">
                <div className="w-4/5 md:w-1/2 py-20 mt-24 text-center md:text-left bg-white shadow-2xl">

                    <h2 className="text-2xl w-full sm:text-3xl md:text-4xl mb-12 font-bold text-center text-main">Create an account</h2>
                    
                    <form className="mt-8 px-12 sm:px-32" onSubmit={handleSignup}>
                        <div className="">
                            <div>
                                <label className="block mt-4" htmlFor='username'>Username</label>
                                <input
                                    className="w-full px-4 py-2 text-center mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-main"
                                    type='text'
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
                                    id="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            {error && <p className="mt-4 text-sm text-center tracking-wide text-red-600">{error}</p>}

                            <div className="text-center">
                                <button className="px-6 py-2 mt-8 text-white font-medium transition bg-primary rounded-lg hover:bg-orange-400">Sign Up</button>
                            </div>
                        </div>
                        {success && <p className="mt-4 text-sm text-center tracking-wide text-slate-600">You have successfully registered! Redirecting to Login...</p>}
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signup;