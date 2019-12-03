import React from "react";
import { Link } from "react-router-dom";
import Navi from "../components/Navi";

class EditPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      location: "",
      description: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ 
        username: response.username, 
        location: response.location,
        description: response.description
        }))
      .catch(() => this.props.history.push(`/posts${id}`));
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

    const {
      match: {
        params: { id }
      }
    } = this.props;

    event.preventDefault();
    const url = `/api/v1/posts/${id}`;
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
        method: "PUT",
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
      .then(response => this.props.history.push(`/post/${this.props.match.params.id}`))
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
                {this.state.username}
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="postLocation">Location</label>
                  <input
                    value={this.state.location}
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
                  value={this.state.description}
                  className="form-control"
                  id="description"
                  name="description"
                  rows="5"
                  required
                  onChange={this.onChange}
                />
                <button type="submit" className="btn custom-button mt-3">
                  Update Post
                </button>
                <Link to={`/post/${this.props.match.params.id}`} className="btn btn-link mt-3">
                  Back to post
                </Link>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default EditPost;