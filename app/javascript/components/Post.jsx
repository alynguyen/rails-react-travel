import React from "react";
import { Link } from "react-router-dom";
import Navi from "../components/Navi";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: {} };

    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.deletePost = this.deletePost.bind(this);
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
      .then(response => this.setState({ post: response }))
      .catch(() => this.props.history.push("/posts"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deletePost() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/"))
      .catch(error => console.log(error.message));
  }

  render() {
    const { post } = this.state;
    let notesList = "No notes available";
    return (
      <div className="">
        <Navi />
        <div className="card mb-3 show-card">
          <img className="card-img-top show-img" src="https://picsum.photos/800/200" alt="Card image cap" style={{height: "20rem"}}/>
          <div className="card-body">
            <h5 className="card-title">{this.state.post.location}</h5>
            <p className="card-text">{this.state.post.description}</p>
            <div className="show-links">
              <p className="card-text show-name"><small className="text-muted">Created by {this.state.post.username}</small></p>
              <div>
                <Link to="/edit_post" className="btn custom-button">
                  Edit
                </Link>
                <Link to="" className="btn custom-button" onClick={this.deletePost}>
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Post;