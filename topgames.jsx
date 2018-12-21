import { useState, useEffect } from "react";
import React from "react";
import Loading from "./loading.jsx";
import TopLayout from "./toplayout";
import { myContext } from "./twitchcontext";
import "./app.css";

const myHeaders = {
  headers: { "Client-ID": "mftf7euslgudgbke20l34acp24shbw" }
};

function TopGames() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heading, setHeading] = useState("Top Games");
  const menukey = "3";

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    const url = "https://api.twitch.tv/helix/games/top";

    const response = await fetch(url, myHeaders);
    const json = await response.json();
    const games = await json.data.map(game => {
      let thumbnail = game.box_art_url;
      thumbnail = thumbnail.slice(0, thumbnail.length - 20);
      thumbnail += "240x340.jpg";

      return {
        id: game.id,
        name: game.name,
        thumbnail: thumbnail
      };
    });

    setList(games);
    setLoading(false);
  };

  const changeList = async (game, gamename) => {
    setLoading(true);
    const url = `https://api.twitch.tv/helix/streams?first=20&game_id=${game}`;
    const response = await fetch(url, myHeaders);
    const json = await response.json();
    const streams = json.data.map(streamer => {
      let thumbnail = streamer.thumbnail_url;
      thumbnail = thumbnail.slice(0, thumbnail.length - 20);
      thumbnail += "250x150.jpg";

      let stream = `https://www.twitch.tv/${streamer.user_name}`;

      return {
        url: stream,
        id: streamer.user_id,
        name: streamer.user_name,
        gameid: streamer.game_id,
        viewers: streamer.viewer_count,
        thumbnail: thumbnail
      };
    });
    console.log();
    setList(streams);
    setHeading(`Top ${gamename} Streams`);
    setLoading(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <myContext.Provider value={{ list, changeList, heading }}>
      <TopLayout menukey={menukey} />
    </myContext.Provider>
  );
}

export default TopGames;
