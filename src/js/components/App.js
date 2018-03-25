import React from "react";
import Search from "./Search";
import LoginForm from "./User";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const App = () => (
  <div className="row mt-5">
    <div className="col-md-12 offset-md-12">
      <Route exact path="/" component={LoginForm} />
      <Route path="/search" component={Search} />
    </div>
  </div>
);


export default App;
