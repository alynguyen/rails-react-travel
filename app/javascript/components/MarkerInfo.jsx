import React from 'react';
import { Link } from 'react-router-dom';

const MarkerInfo = (props) => {
  return (
    <>
        <Link to={`/post/${props.id}`}>
          <div id="info-img" className="marker-info animated bounce">
              <img src={props.reference} />
          </div>
        </Link>
    </>
  );
}

export default MarkerInfo;
