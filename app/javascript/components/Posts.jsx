import { Link } from "react-router-dom";
import React, { Component } from 'react';

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

  render() {

    const allPosts = this.props.posts ? ( 
      this.props.posts.map((p, idx) => (
        <div key={idx} className="card post-card">
          <div className="card-body">
            <h5 className="card-title">{this.stripTitle(p.location)}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{p.username}</h6>
            <p className="card-text">{p.description}</p>
            <Link to={`post/${p.id}`} className="card-link">Card link</Link>
          </div>
        </div>
      ))
    )
    : <>Loading</>

    const noPosts = (
      <div>
        <h4>
          No posts yet. Why not <Link to="/new_post">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/new_post" className="btn custom-button">
                Create New Post
              </Link>
            </div>
            <div className="row">
              {this.props.posts.length > 0 ? allPosts : noPosts}
            </div>
          </main>
        </div>
      </>
    );
  }

}
export default Posts;
