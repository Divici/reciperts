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
        <div>
            <Header/>
            <div className="title">
                <h1>Sign Up</h1>
            </div>
            <div className="container">
                <form className="form" onSubmit={handleSignup}>
                    <div>
                        {error && <p id='error'>{error}</p>}
                        <label className="label" htmlFor='username'>Username</label>
                        <input
                            className="input"
                            type='text'
                            id="username"
                            value={credentials.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="label" htmlFor='password'>Password</label>
                        <input
                            className="input"
                            type='password'
                            id="password"
                            value={credentials.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className='button center primary max'>Sign Up</button>
                    {success && <p>You have successfully registered! Redirecting to Login...</p>}
                </form>
            </div>
        </div>
    )
}

export default Signup;