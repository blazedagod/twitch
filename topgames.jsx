import { useState, useEffect } from "react";
import React from "react";
import Loading from "./loading.jsx";
import GamesLayout from "./gameslayout";
import "./app.css";

function TopGames() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    const url = "https://api.twitch.tv/helix/games/top";
    const myHeaders = {
      headers: { "Client-ID": "mftf7euslgudgbke20l34acp24shbw" }
    };
    const response = await fetch(url, myHeaders);
    const json = await response.json();
    const games = await json.data.map(game => {
      let thumbnail = game.box_art_url;
      thumbnail = thumbnail.slice(0, thumbnail.length - 20);
      thumbnail += "240x340.jpg";

      return {
        name: game.name,
        thumbnail: thumbnail
      };
    });
    setList(games);
    setLoading(false);
  };

  return loading ? <Loading /> : <GamesLayout list={list} />;
}

export default TopGames;
