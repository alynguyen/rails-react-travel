import React from "react";
import { Link } from "react-router-dom";
import Navi from "../components/Navi";

class NewPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user,
      location: "",
      description: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/posts/create";
    const { username, location, description } = this.state;

    if (location.length == 0 || description.length == 0)
      return;

    const body = {
      username,
      location,
      description
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: "POST",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/post/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <>
        <Navi />
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">
                Add a new post
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="postLocation">Location</label>
                  <input
                    type="text"
                    name="location"
                    id="postLocation"
                    className="form-control"
                    required
                    onChange={this.onChange}
                  />
                </div>
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="5"
                  required
                  onChange={this.onChange}
                />
                <button type="submit" className="btn custom-button mt-3">
                  Create Post
                </button>
                <Link to="/" className="btn btn-link mt-3">
                  Back to posts
                </Link>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default NewPost;