require.context('../public/', true);
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/base.scss';
import 'babel-core/register';
import 'babel-polyfill';
import { TomatoChat } from './components/TomatoChat.tsx';

ReactDOM.render(
    <TomatoChat />,
    document.getElementById('react-container')
);
