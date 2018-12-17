import React from "react";

const Streamer = props => {
  return (
    <li>
      <img alt={props.name} src={props.thumbnail} />
      <br />
      <b>{props.name}</b> is live with
      <span style={{ color: "red" }}> {props.viewers}</span> viewers!
    </li>
  );
};

export default Streamer;
