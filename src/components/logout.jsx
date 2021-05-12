import React from 'react';
import { Route } from "react-router-dom";

export default function Logout() {

    const condition = localStorage.getItem("token") !== 'clear';

    if (condition){
        window.location.reload();
    }
    localStorage.setItem("token", 'clear');
    return (
        <div>
            <Route path="/home" component={Home}></Route>
        </div>
    )

}