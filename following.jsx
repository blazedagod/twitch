import React from "react";
import { useState, useEffect } from "react";
import Loading from "./loading.jsx";
import FollowLayout from "./flayout";
import { myContext } from "./twitchcontext";
import "./app.css";

function Following() {
  const [userinput, setInput] = useState("");
  const [userid, setId] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const heading = `${list.length} Streamers Online`;
  let searchtext = "enter your username";

  const myHeaders = {
    headers: { "Client-ID": "mftf7euslgudgbke20l34acp24shbw" }
  };

  useEffect(() => {
    if (!userinput) {
      setLoading(false);
    }
  }, []);

  const onChange = e => {
    setInput(e.target.value);
  };

  const findId = async name => {
    const url = `https://api.twitch.tv/helix/users?login=${name}`;
    const response = await fetch(url, myHeaders);
    const json = await response.json();
    const id = json.data[0].id;
    setId(id);
    setLoading(true);

    return id;
  };

  const findFollows = async name => {
    const id = await findId(name);
    const url = `https://api.twitch.tv/helix/users/follows?from_id=${id}&first=50`;
    const response = await fetch(url, myHeaders);
    const json = await response.json();
    const follows = json.data.map(streamer => streamer.to_id);

    return follows;
  };

  const onlineStreamers = async e => {
    e.preventDefault();
    const follows = await findFollows(userinput);
    let url = `https://api.twitch.tv/helix/streams?`;

    follows.forEach(streamer => {
      url += `user_id=${streamer}&`;
    });

    const response = await fetch(url, myHeaders);
    const json = await response.json();
    const streamers = json.data.map(streamer => {
      let stream = `https://www.twitch.tv/${streamer.user_name}`;
      let thumbnail = streamer.thumbnail_url;
      thumbnail = thumbnail.slice(0, thumbnail.length - 20);
      thumbnail += "250x150.jpg";

      return {
        url: stream,
        id: streamer.user_id,
        name: streamer.user_name,
        game: streamer.game_id,
        viewers: streamer.viewer_count,
        thumbnail: thumbnail
      };
    });

    setList(streamers);
    setInput("");
    setLoading(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <myContext.Provider
      value={{
        heading,
        userid,
        onChange,
        onlineStreamers,
        userinput,
        searchtext,
        list
      }}
    >
      <FollowLayout />
    </myContext.Provider>
  );
}

export default Following;
