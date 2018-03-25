import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./components/App";
import { createBrowserHistory } from "history";
import { BrowserRouter , Route, Switch, Link } from 'react-router-dom';
const history = createBrowserHistory();

render(
  <BrowserRouter history={history}>	
	<Provider store={store}>
		<App />
	</Provider>
  </BrowserRouter>,
  document.getElementById("app")
);
