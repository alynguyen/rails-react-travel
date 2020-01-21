import React, { Component } from 'react';
import axios from 'axios';
import Navi from '../Navi';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
     };
  }

  // baseUrl = process.env.baseURL || "http://localhost:3001";

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };
  
  handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password, password_confirmation} = this.state
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
  
    axios.post(`${process.env.baseURL}users`, {user}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
  
  redirect = () => {
    this.props.history.push('/')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map((error) => {
            return <li key={error}>{error}</li>
          })}
        </ul> 
      </div>
    )
  }

render() {
    const {username, email, password, password_confirmation} = this.state
return (
      <div>
        <Navi />
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">Sign Up</h1>
              <form onSubmit={this.handleSubmit}>
                <input
                  className="form-control signup-input"
                  placeholder="username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  />
                <input
                  className="form-control signup-input"
                  placeholder="email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  />
                <input 
                  className="form-control signup-input"
                  placeholder="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  />
                <input
                  className="form-control signup-input"
                  placeholder="password confirmation"
                  type="password"
                  name="password_confirmation"
                  value={password_confirmation}
                  onChange={this.handleChange}
                  />
                <div className="container new-post-links">
                  <button className="btn custom-button" placeholder="submit" type="submit">
                    Submit
                  </button>
                </div>
              </form>
              <div>
                {
                  this.state.errors ? this.handleErrors() : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;