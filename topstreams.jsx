import React, { Component } from "react";
import "./app.css";
import TSLayout from "./tslayout";
import Loading from "./loading.jsx";

const myHeaders = {
  headers: { "Client-ID": "mftf7euslgudgbke20l34acp24shbw" }
};

class TopStreams extends Component {
  state = { streamers: [], loading: true };

  componentDidMount() {
    this.getStreams();
  }

  async getStreams() {
    const url = "https://api.twitch.tv/helix/streams?first=20";
    const response = await fetch(url, myHeaders);
    const json = await response.json();

    const streamers = json.data.map(streamer => {
      let thumbnail = streamer.thumbnail_url;
      thumbnail = thumbnail.slice(0, thumbnail.length - 20);
      thumbnail += "250x150.jpg";

      return {
        id: streamer.user_id,
        name: streamer.user_name,
        game: streamer.game_id,
        viewers: streamer.viewer_count,
        thumbnail: thumbnail
      };
    });

    this.setState({ streamers, loading: false });
  }

  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <TSLayout streamers={this.state.streamers} />
    );
  }
}

export default TopStreams;
