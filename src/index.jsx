import { App } from './App.tsx';
require.context('../public/', true);
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.scss';
import 'babel-core/register';
import 'babel-polyfill';

ReactDOM.render(
    <App />,
    document.getElementById('react-container')
);
