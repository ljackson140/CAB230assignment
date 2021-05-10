import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { Error } from './login'


export default function Register(){
    const [innerEmail, setInnerEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repPass, setRepPass] = useState('');
    const [error, setError] = useState(false);
    const [eCode, setECode] = useState();
    const [obtained, setObtained] = useState(false);


    function submitSignup() {
        const url = "http://131.181.190.87:3000/user/register"
        if (pass === repPass) {
            return fetch(url, {
                method: "POST",
                headers: { accept: "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ email: innerEmail, pass: pass })
            })
                .then((res) => {
                    if (!res.ok) {
                        setECode(res.status)
                        setError(true);
                        setInnerEmail('');
                        setPass('');
                        setRepPass('');
                    }
                    else {
                        setError(false);
                        setObtained(true);
                    }
                })
                .catch((e) => {
                })
        }
        else {
            setError(true);
            setECode(400)
            setInnerEmail('');
            setPass('');
            setRepPass('');
        }
    }

    if (obtained === false) {
        return (
            <div>
                <div className="headDiv">
                    <div className="tbox">
                        <div className="tMessage">
                            <div className="title">
                                Happiness Portal
                            </div>
                        </div>
                    </div>
                    <div className="userRegDiv">
                        <Error error={error} type="Signup" code={eCode} />
                        <div>
                            <p className="login-label">Email</p>
                            <input
                                name="email"
                                id="email"
                                type="email"
                                value={innerEmail}
                                onChange={(e) => setInnerEmail(e.target.value)}
                            />
                            <br />
                            <p className="login-label" >Create Password</p>
                            <input
                                name="pass"
                                id="pass"
                                type="pass"
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                            />
                            <br />
                            <p className="login-label" >Repeat Password</p>
                            <input
                                aria-labelledby="repeat-pass-field"
                                name="repeat-pass"
                                id="repeat-pass"
                                type="pass"
                                value={repPass}
                                onChange={(e) => setRepPass(e.target.value)}
                            />
                            <br />
                            <button
                                id="submit-button"
                                type="button"
                                onClick={() => { submitSignup() }}
                            >
                                Signup
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
    else if (obtained === true) {
        return (
            <div>
                <Redirect to="/login" />
            </div>
        )
    }

}


 
