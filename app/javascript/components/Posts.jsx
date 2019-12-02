import { Link } from "react-router-dom";
import React, { Component } from 'react';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
      const url = "/api/v1/posts/index";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ recipes: response }))
        .catch(() => this.props.history.push("/"));
  }

  render() {
    const { posts } = this.state;
    const allPosts = (
      <div>
        <p>
          posts exist
        </p>
      </div>
    );
    const noPosts = (
      <div>
        <h4>
          No posts yet. Why not <Link to="/new_post">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/post" className="btn custom-button">
                Create New Post
              </Link>
            </div>
            <div className="row">
              {posts.length > 0 ? allPosts : noPosts}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }

}
export default Posts;
