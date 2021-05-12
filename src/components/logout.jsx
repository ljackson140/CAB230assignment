import React from 'react';
import { NavLink } from "react-router-dom";

export default function Logout() {
    if (localStorage.getItem("token") !== 'clear'){
        window.location.reload();
    }
    localStorage.setItem("token", 'clear');
    return (
        <div>
            <NavLink to="/home" />
        </div>
    )

}