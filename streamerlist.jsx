import React from "react";
import Streamer from "./streamer";

const StreamerList = props => {
  return (
    <div>
      <h2>{props.list.length} Streamers Online</h2>
      <ul>
        {props.list.map(streamer => (
          <Streamer
            name={streamer.name}
            key={streamer.id}
            thumbnail={streamer.thumbnail}
            viewers={streamer.viewers}
          />
        ))}
      </ul>
    </div>
  );
};

export default StreamerList;
