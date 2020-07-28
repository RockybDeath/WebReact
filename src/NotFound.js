import React from 'react';
import logo from './logo.svg';
import './App.css';
import {browserHistory} from "react-router";

function NotFound() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Страница не найдена</p>
                <a className="App-link" onClick={()=>browserHistory.push("/login")} target="_blank"
                   rel="noopener noreferrer">
                    Вернуться на главную
                </a>
            </header>
        </div>
    );
}

export default NotFound;