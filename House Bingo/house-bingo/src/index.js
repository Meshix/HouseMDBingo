import React from 'react';
import ReactDOM from 'react-dom/client';
import HouseBingo from './HouseBingo';
import "./index.css";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HouseBingo />
  </React.StrictMode>
);