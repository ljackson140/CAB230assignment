import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import "./styles/register.css";
import { Error } from './error';


export default function Signup() {
    //Error area
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState();

    //redentials area
    const [innerEmail, setInnerEmail] = useState('');
    const [password, setPassword] = useState('');
    
    //verified area
    const [verified, setVerified] = useState(false);

    //call to API
    function Registration() {
        const url = "http://131.181.190.87:3000/user/register"
        if (password) {
            return fetch(url, {
                method: "POST",
                headers: { accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ email: innerEmail, password: password })
            })
                .then((res) => {
                    if (!res.ok) {
                        setErrorCode(res.status)
                        setError(true);
                        setInnerEmail('');
                        setPassword('');
                    }
                    else {
                        setError(false);
                        setVerified(true);
                    }
                })
                .catch((e) => {
                })
        }
        else {
            setError(true);
            setErrorCode(400)
            setInnerEmail('');
            setPassword('');
        }
    }

    if (verified === false) {
        return (
            <div>
                <div className="headDiv">
                    <div className="transbox">
                        <div className="transMessage">                         
                            <h1>Register</h1>                  
                        </div>
                    </div>
                    <div className="userRegisDiv">
                        <Error error={error} type="registration" code={errorCode} />
                        <div>
                            <div className="email-form">
                                <label for="email">Email:</label>
                                <input
                                    aria-labelledby="inputEmail"
                                    name="email"
                                    id="email"
                                    type="email"
                                    value={innerEmail}
                                    onChange={(e) => setInnerEmail(e.target.value)}
                                />
                            </div>
                            
                            <div className="password-form">
                                <label for="name">Password:</label>
                                <input
                                    aria-labelledby="password-field"
                                    name="password"
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                id="submit-button"
                                type="button"
                                onClick={() => { Registration() }}>
                                Signup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if (verified === true) {
        return (
            <div>
                <Redirect to="/login" />
            </div>
        )
    }
}