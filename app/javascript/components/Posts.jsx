import { Link } from "react-router-dom";
import React, { Component } from 'react';
import PostCard from './PostCard';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // posts: []
    };
  }

  stripTitle = (str) => {
    let arr = str.split(",")
    return arr[0]
  }

  mouseOverCard = () => {
    console.log("Mouse Over Card")
  }

  mouseOutCard() {
    console.log("lsjdlfsjldfk")
  }

  render() {

    const allPosts = this.props.posts ? ( 
      this.props.posts.map((post, index) => (
          <PostCard 
            onMouseOver={this.mouseOverCard}
            onMouseLeave={this.mouseOutCard}
            key={index}
            id={post.id}
            location={post.location}
            username={post.username}
            description={post.description}
            markLat={post.lat}
            markLng={post.lng}
            reference={post.reference}
            stripTitle={this.stripTitle}
          />
      ))
    )
    : <>Loading...</>

    const noPosts = (
      <div>
        <h4>
          No posts yet.
        </h4>
      </div>
    );

    const newPost = this.props.loggedInStatus
      ? <Link to="/new_post" className="btn custom-button">
          Create New Post
        </Link>
      : null
    
    return (
      <>
        <div className="posts">
          <main className="container">
            <div className="text-right mb-3">
              { newPost }
            </div>
            <div className="row posts-con">
              {this.props.posts.length > 0 ? allPosts : noPosts}
            </div>          
          </main>
        </div>
      </>
    );
  }

}
export default Posts;
