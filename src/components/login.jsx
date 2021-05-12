import React, { useState } from 'react';
import NavBar from './navbar';
import { Redirect } from "react-router-dom";
import "./styles/homee.css";
import "./styles/login.css";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [verified, setVerified] = useState('clear');


    function proccessLogin() {
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

    if (verified === 'clear') {
        return (
            <div>
                <div className="headDiv">
                    <div className="tbox">
                        <div className="tMessage">
                            <div className="title">
                                Login 
                            </div>
                        </div>
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
                                    onClick={() => { proccessLogin() }}
                                >
                                    Login
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
    else if (!error & verified !== 'clear') {
        return (
            <div>
                <NavBar />
                <Redirect to="/home" />
            </div>
        )
    }
}

