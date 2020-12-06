// index.js
import React from "react";
import ReactDOM from "react-dom";

// JSX element, app
const app = (
   <div className='app'>
      <h1>Welcome to DeSec</h1>
   </div>
);

const rootElement = document.getElementById("root");
// we render the JSX element using the ReactDOM package
ReactDOM.render(app, rootElement);
