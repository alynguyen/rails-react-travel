import React from 'react';
import axios from 'axios'
import Posts from '../components/Posts'  
import Navi from '../components/Navi'  
import GoogleMap from '../components/GoogleMap'  


const Home = (props) => {
  
  const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }

return (
   
    <div>
      <Navi
        loggedInStatus={props.loggedInStatus}
        handleClick={handleClick}
      />
      <GoogleMap 
        {...props}
      />
      <Posts
        handleClick={handleClick} 
        onMarkEnter={props.onMarkEnter}
        posts={props.posts}
        loggedInStatus={props.loggedInStatus}
      />
    </div>
  );
};

export default Home;
