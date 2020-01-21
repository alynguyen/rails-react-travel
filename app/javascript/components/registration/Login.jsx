import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navi from '../Navi';

baseUrl = process.env.baseURL || "http://localhost:3001"

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
      password: '',
      errors: ''
     };
  }

  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password} = this.state
    let user = {
      username: username,
      email: email,
      password: password
    }
    
  axios.post(`${baseUrl}/login`, {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
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
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  render() {
    const {username, email, password} = this.state
    return (
      <div>
        <Navi />
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">Log In</h1>
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
                <div className="new-post-links">
                  <button className="btn custom-button" placeholder="submit" type="submit">
                    Log In
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
export default Login;