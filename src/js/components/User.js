import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import uuidv1 from "uuid";
import { checkUserCredentials } from "../actions/index";

class ConnectedForm extends Component {
  constructor() {
    super();

    this.state = {
      userName: "",
      password: "",
      showError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({showError: false});
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userName, password } = this.state;
    const id = uuidv1();
    let isValid = false;
    this.setState({showError: true});
    if (userName !== "" && this.isYearValid()) {
      isValid = true;
      this.props.history.push('/search');
    }
    this.props.checkUserCredentials({ userName, password, isValid });
    this.setState({ userName: "", password: "" });
  }

  isYearValid() {
    const yearText = /^[0-9]+$/;
    const { password } = this.state;
    if (password !== "" && password.length === 4 && password < 2018 && password > 1920 && yearText.test(password)) {
      return true
    }
  }

  showError() {
    const {valid} = this.props.user;
    if (!valid && this.state.showError) {
      return (
        <div className="border border-danger mb-4">
          Please enter valid user credentials..
        </div>
      )
    }
    return null

  }

  render() {
    const { userName, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Please login</h2>
        <div className="form-group">
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            className="form-control"
            id="userName"
            value={userName}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Title</label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={password}
            onChange={this.handleChange}
          />
        </div>
        {this.showError()}
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  checkUserCredentials
};

const mapStateToProps = (state) => ({
  user: state.user
});

const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);


export default Form;
