import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/registration/Login'
import Signup from '../components/registration/Signup'
import Posts from '../components/Posts'
import Post from '../components/Post'
import NewPost from '../components/NewPost'
import EditPost from '../components/EditPost'
import { getCurrentLatLng } from '../utils/location';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {},
      lat: null,
      lng: null,
      posts: []
     };
  }

  componentDidMount() {
    this.loginStatus()
    this.getPosts()
    this.getLocation()
  }

  getPosts = () => {
    const url = "/api/v1/posts/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ posts: response }))
      .catch(() => this.props.history.push("/"));
  }

  getLocation = async () => {
    const {lat, lng} = await getCurrentLatLng();
    this.setState({ lat, lng })
  }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', 
    {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user,
    })
  }

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }
  
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path='/' 
              render={props => (
                <Home {...props} 
                  handleLogout={this.handleLogout} 
                  loggedInStatus={this.state.isLoggedIn}
                  lat={this.state.lat}
                  lng={this.state.lng}
                  posts={this.state.posts}
                />
              )}
            />
            <Route 
              exact path='/login' 
              render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
              <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            {/* <Route path="/posts" exact component={Posts} /> */}
            <Route 
              exact path='/post/:id'
              render={props => (
              <Post 
                {...props}
                getPosts={this.getPosts}
              />
              )}
            />
            <Route path='/post/edit/:id' exact component={EditPost} />
            <Route
              exact path='/new_post'
              render={props => (
              this.state.user 
              ? <NewPost {...props}
                  lat={this.state.lat}
                  lng={this.state.lng}
                  user={this.state.user.username}
                  getPosts={this.getPosts}
                />
              : <Home />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;