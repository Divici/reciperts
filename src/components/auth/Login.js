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
            })
            .catch(err=>{
                setError(err.response.data.message)
            })
    }

    return (
        <div>
            <Header/>
            <div className="title">
                <h1>Log in</h1>
            </div>
            <div className="container">
                
                <form className="form" onSubmit={handleLogin}>
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
                    <button className="button center primary max" id='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;