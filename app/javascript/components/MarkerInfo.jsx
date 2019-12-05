import React from 'react';

const MarkerInfo = (props) => {
  return (
    <>
      <div className="marker-info">
        <img src={props.reference} />
      </div>
    </>
  );
}

export default MarkerInfo;
