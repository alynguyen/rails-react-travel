import React from 'react';

const MarkerInfo = (props) => {
  return (
    <>
      <div id="info-img" className="marker-info animated bounce">
        <img src={props.reference} />
      </div>
    </>
  );
}

export default MarkerInfo;
