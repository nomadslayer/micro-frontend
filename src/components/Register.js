import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FormField from './FormField';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import { validate } from 'isemail';

class Register extends Component {

  // initialize state to hold validity of form fields
  state = { name: '', email: '', password: '' }
  newState = {_name:'', _email: '', _password: ''}

  // higher-order function that returns a state change watch function
  // sets the corresponding state property to true if the form field has no errors
  fieldStateChanged = field => newState => this.setState({ [field]: this.state.value });

  // state change watch functions for each field
  // emailChanged = this.fieldStateChanged('_email');
  // fullnameChanged = this.fieldStateChanged('_name');
   passwordChanged = this.fieldStateChanged('_password');

  handleSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();
      fetch('https://micro-authentication.herokuapp.com/auth/register', { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(this.state)
    }).then(function(response) {
      console.log(response)
      return response.json();
    });
};

  render() {
    const { name, email, password } = this.state;
    //const formValidated = fullname && email && password;

    // validation function for the fullname
    // ensures that fullname contains at least two names separated with a space
    const validateFullname = value => {
      const regex = /^[a-z]{2,}(\s[a-z]{2,})+$/i;
      console.log(value)
      if (!regex.test(value)) 
        throw new Error('Fullname is invalid');
      else
        this.setState({name: value})
        console.log(validateFullname);        
    };

    const emailChanged = value => {
      if (!validate(value))
        throw new Error('Email is invalid');
      else
        this.setState({ email: value})  
    };
  
    const passwordChanged = (value)=> {
      const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{11,})/;
      if (!regex.test(value))
        throw new Error('Password min 12 character, with 1 Uppercase and 1 non alphanumeric');
      this.setState({ password: value}) 
    };

    return (
      <div className="form-container d-table-cell position-relative align-middle">
        <form action="/" method="POST" noValidate>

          <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
            <legend className="form-label mb-0">Register</legend>
            {/** Show the form button only if all fields are valid **/}
            { <button type="button" className="btn btn-primary text-uppercase px-3 py-2" onClick={this.handleSubmit}>Submit</button> }
          </div>

          <div className="py-5 border-gray border-top border-bottom">
            {/** Render the fullname form field passing the name validation fn **/}
            <FormField type="text" fieldId="name" label="Fullname" placeholder="Enter Fullname" validator={validateFullname} onStateChanged={this.fullnameChanged} required />

            {/** Render the email field component **/}
            <FormField type="text" fieldId="email" label="Email" placeholder="Enter Email" validator={emailChanged} onStateChanged={this.emailChanged} required />

            {/** Render the password field component using thresholdLength of 7 and minStrength of 3 **/}
            <FormField type="password" fieldId="password" label="Password" placeholder="Enter Password" validator={passwordChanged} required />
          </div>

        </form>
      </div>
    );
  }

}

export default Register;
