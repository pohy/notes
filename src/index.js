import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';

const Application = () => (
    <Router basename="/notes">
        <App/>
    </Router>
);

ReactDOM.render(<Application/>, document.getElementById('root'));
registerServiceWorker();
