import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import Post from '../components/Posts'  
import Navi from '../components/Navi'  


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
      <Post />
    </div>
  );
};

export default Home;
