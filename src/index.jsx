require.context('../public/', true);
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/base.scss';
import 'babel-core/register';
import 'babel-polyfill';
import { TomatoChat } from './components/TomatoChat.tsx';

ReactDOM.render(
    <TomatoChat />,
    document.getElementById('react-container')
);
