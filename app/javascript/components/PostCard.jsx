import React from 'react';
import { Link } from 'react-router-dom';


const PostCard = (props) => {

  return (
    <div className="card post-card">
      <div className="card-body">
        <h5 className="card-title">{props.stripTitle(props.location)}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.username}</h6>
        <p className="card-text">{props.description}</p>
        <Link to={`post/${props.id}`} className="card-link">View</Link>
      </div>
    </div>
  );
}

export default PostCard;
