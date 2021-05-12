import { Alert } from "react-bs-notifier";
import React from 'react';

export function Error(inner) {
    if (inner.error) {
        if (inner.code === 409) {
            return (
                <div className="inaccu-div">
                    <Alert type="danger" headline="Error">
                        {inner.type} Provided email alreday in use.
                    </Alert>
                </div> 
            )
        } 
        else {
            return (
                <div className="inaccu-div">
                    <Alert type="danger" headline="Error">
                        {inner.type} Ensure correct credentials are used.
                    </Alert>
                </div>
            )
        }
    }
    else {
        return (<div></div>)
    }
}