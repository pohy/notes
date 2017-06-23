import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const Application = () => (
    <Router>
        <App/>
    </Router>
);

ReactDOM.render(<Application/>, document.getElementById('root'));
registerServiceWorker();
