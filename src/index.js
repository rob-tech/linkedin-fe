import React from 'react';
import ReactDOM from 'react-dom';
import './StyleSheets/NavBar.css';
import './StyleSheets/Sections.css';
import './StyleSheets/About.css';
import './StyleSheets/Experience.css';
import './StyleSheets/Feeds.css';
import './StyleSheets/Chat.css';
import './StyleSheets/Login.css';
import './StyleSheets/Register.css';
import '../src/index.css'
import '../src/App.css'
import Main from './Components/Main';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Main/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
