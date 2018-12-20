import React from "react";
import { useState, useEffect } from "react";
import Loading from "./loading.jsx";
import TSLayout from "./tslayout";
import "./app.css";

function TopStreams() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStreams();
  }, []);

  const getStreams = async () => {
    const url = "https://api.twitch.tv/helix/streams?first=24";
    const myHeaders = {
      headers: { "Client-ID": "mftf7euslgudgbke20l34acp24shbw" }
    };

    const response = await fetch(url, myHeaders);
    const json = await response.json();
    const streams = json.data.map(streamer => {
      let thumbnail = streamer.thumbnail_url;
      thumbnail = thumbnail.slice(0, thumbnail.length - 20);
      thumbnail += "250x150.jpg";
      let stream = `https://www.twitch.tv/${streamer.user_name}`;
      console.log(stream);

      return {
        url: stream,
        id: streamer.user_id,
        name: streamer.user_name,
        game: streamer.game_id,
        viewers: streamer.viewer_count,
        thumbnail: thumbnail
      };
    });

    setList(streams);
    setLoading(false);
  };

  return loading ? <Loading /> : <TSLayout list={list} />;
}

export default TopStreams;
