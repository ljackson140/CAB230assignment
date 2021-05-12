import React, { useState } from 'react';
import NavBar from './navbar';
import { Redirect } from "react-router-dom";
import "./styles/homee.css";
import "./styles/login.css";
import { Error } from './error';

export default function Login() {

    //error
    const [error, setError] = useState(false);

    //credentials
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    //verification
    const [verified, setVerified] = useState('clear');

    //call to API
    function loginCall() {
        const url = "http://131.181.190.87:3000/user/login"
        localStorage.setItem('token', 'clear');
        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.error) {
                    setError(false);
                    localStorage.setItem('token', res.token);
                    setVerified(localStorage.getItem('token'))
                }
                else {
                    setError(true);
                    setEmail('');
                    setPassword('');
                }
            })
    }

    if (!error & verified !== 'clear') {
        return (
            <div>
                <NavBar />
                <Redirect to="/home" />
            </div>
        )
    }

    else if (verified === 'clear') {
        return (
            <div>
                <div className="headDiv">
                    <div className="tMessage">                          
                        <h1>Login</h1> 
                    </div>
                    <div className="userLoginDiv">
                        <div>
                            <Error error={error} type="Login" />
                                <div className="email-form">
                                    <label for="name">Email:</label>
                                    <input 
                                        name="email"
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                
                                <div className="password-form">
                                    <label for="pass">Password:</label>
                                    <input
                                        name="pass"
                                        id="pass"
                                        type="pass"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    id="sButton"
                                    type="button"
                                    onClick={() => { loginCall() }}
                                >
                                    Login
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

