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
      posts: [],
      hover: false,
      markLat: null,
      markLng: null,
      markRef: null,
      markId: null,
     };
  }

  componentDidMount() {
    this.getPosts()
    this.getLocation()
  }

  componentWillUnmount() {
    this.handleLogout()
  }

  onMarkEnter = (evt, marker) => {
    // console.log(evt,marker,"mouse enter")
    this.setState({
      hover: true,
      markLat: marker.lat,
      markLng: marker.lng,
      markRef: marker.reference,
      markId: marker.id
    })
  }

  onMarkLeave = (evt, marker) => {
    // console.log(evt,"mouse leave")
    this.setState({
      hover: false,
      markLat: null,
      markLng: null,
      markRef: null,
      markId: null
    })
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
                <Home
                  handleLogout={this.handleLogout}
                  {...this.state} 
                  onMarkEnter={this.onMarkEnter}
                  onMarkLeave={this.onMarkLeave}
                />
              )}
            />
            <Route 
              exact path='/login' 
              render={props => (
              <Login 
                {...props} 
                handleLogin={this.handleLogin} 
                loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
              <Signup 
                {...props} 
                handleLogin={this.handleLogin} 
                loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route 
              exact path='/post/:id'
              render={props => (
              <Post 
                {...props}
                loggedInStatus={this.state.isLoggedIn}
                getPosts={this.getPosts}
              />
              )}
            />
            <Route 
              exact path='/post/edit/:id'
              render={props => (
              <EditPost 
                {...props}
                loggedInStatus={this.state.isLoggedIn}
              />
              )}
            />
            <Route
              exact path='/new_post'
              render={props => (
              this.state.user 
              ? <NewPost {...props}
                  loggedInStatus={this.state.isLoggedIn}
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