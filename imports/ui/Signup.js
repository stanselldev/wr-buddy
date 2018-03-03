import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let profile = {
      firstName: this.refs.firstName.value.trim(),
      lastName: this.refs.lastName.value.trim()
    };

    if (password.length < 9) {
      return this.setState({error: 'Password must be more than 8 characters long.'})
    }

    Accounts.createUser({email, password, profile}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join WR Buddy</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <input type="text" ref="firstName" name="firstName" placeholder="First Name" />
            <input type="text" ref="lastName" name="lastName" placeholder="Last Name" />
            <button className="button">Create Account</button>
          </form>

          <Link to="/">Already have an account? Click here to login.</Link>
        </div>
      </div>
    );
  }
}
