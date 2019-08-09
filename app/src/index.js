import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
import Todos from "./components/Todos";
import "antd/dist/antd.css";
import Layout from "./components/Layout";

require("dotenv").config();

ReactDOM.render(
  <BrowserRouter>
    <Layout />
    <div className="App">
      <Route path="/" exact component={App} />
      <Route
        path="/todos/:id"
        render={props => <Todos id={props.match.params.id} />}
      />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

