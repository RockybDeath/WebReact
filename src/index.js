import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NotFound from "./NotFound";
import {Radio} from "./Radio";
import * as serviceWorker from './serviceWorker';
import {Router, Route, browserHistory} from 'react-router';
import {LikeButton} from "./reg";
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={LikeButton}/>
		<Route path="/login" component={LikeButton}/>
        <Route path="/app" component={Radio}/>
        <Route path="/*" component={NotFound}/>
    </Router>
),document.getElementById("red"));

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();
