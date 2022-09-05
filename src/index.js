import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from './redux/store';

function MainApp() {
  return (<>{
    <Provider store={store}>
        <App />
    </Provider>
  }</>);
}

const container = document.getElementById('root');
const root = container && createRoot(container);
root && root.render(<MainApp />);
