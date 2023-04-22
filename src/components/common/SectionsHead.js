import React from "react";

const SectionsHead = (props) => {
  return (
    <>
      <div style={{backgroundImage: props.background, padding: '20px', color: props.color, marginBottom: '2px'}} className="section_head">
        <h2 className="heading">{props.heading}</h2>
      </div>
    </>
  );
};

export default SectionsHead;
