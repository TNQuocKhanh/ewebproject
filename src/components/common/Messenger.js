import React from "react";

const messengeLogo = "/assets/messenger-logowebp.png";

const Messenger = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "12vh",
        right: "1.3vw",
        width: "50px",
        height: "50px",
        cursor: "pointer",
      }}
      className="messenger"
    >
      <img src={messengeLogo} alt="messenger" />
    </div>
  );
};

export default Messenger;
