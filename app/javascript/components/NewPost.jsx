import React from "react";
import { Link } from "react-router-dom";
import Navi from "../components/Navi";
import Geosuggest from 'react-geosuggest';

class NewPost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user,
      location: "",
      description: "",
      lat: "",
      lng: "",
      reference: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  componentWillUnmount() {
    console.log("Unmounting")
    this.props.getPosts()
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
    const { username, location, description, lat, lng, reference } = this.state;

    if (location.length == 0 || description.length == 0)
      return;

    const body = {
      username,
      location,
      description,
      lat,
      lng,
      reference
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

  onSuggestSelect = (suggest) =>  {
    console.log(suggest);
    if (suggest) {
      this.setState({
        lat: suggest.location.lat,
        lng: suggest.location.lng,
        location: suggest.description,
        reference: suggest.gmaps.photos[0].getUrl({'maxWidth': 1800, 'maxHeight': 1800})
      });
    }
  }

  onSuggestNoResults(userInput) {
    console.log('onSuggestNoResults for :' + userInput);
  }

  render() {
    return (
      <>
        <Navi loggedInStatus={this.props.loggedInStatus} />
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-lg-6 offset-lg-3">
              <h1 className="font-weight-normal mb-5">
                Add a new post
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="postLocation">Location</label>
                  <Geosuggest
                    ref={el=>this._geoSuggest=el}
                    placeholder="Search"
                    onSuggestSelect={this.onSuggestSelect}
                    onSuggestNoResults={this.onSuggestNoResults}
                    location={new google.maps.LatLng(this.props.lat, this.props.lng)}
                    radius="20" 
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
                <div className="container new-post-links">
                  <Link to="/" className="btn custom-button mt-3">
                    Back to posts
                  </Link>
                  <button type="submit" className="btn custom-button mt-3">
                    Create Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default NewPost;

