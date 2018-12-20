import React, { Component } from "react";
import "./following.css";
import { Layout } from "antd";
import FollowMenu from "./followmenu";
import FollowContent from "./followcontent";
import Loading from "./loading";

const { Footer } = Layout;
const myHeaders = {
  headers: { "Client-ID": "mftf7euslgudgbke20l34acp24shbw" }
};

class Following extends Component {
  state = { userinput: "", username: "", streamers: [], loading: true };

  onChange = e => this.setState({ userinput: e.target.value });

  componentDidMount() {
    if (!this.state.username) {
      this.setState({ loading: false });
    }
  }

  findId = name => {
    const url = `https://api.twitch.tv/helix/users?login=${name}`;
    const id = fetch(url, myHeaders)
      .then(response => response.json())
      .then(json => {
        const id = json.data[0].id;
        this.setState({ username: id, loading: true });
        return id;
      })
      .catch(e => console.log(e));
    return id;
  };

  findStreamers = name => {
    const streamers = this.findId(name)
      .then(id => {
        const url = `https://api.twitch.tv/helix/users/follows?from_id=${id}&first=50`;

        return fetch(url, myHeaders);
      })
      .then(response => response.json())
      .then(json => json.data.map(streamer => streamer.to_id))
      .catch(e => console.log(e.message));

    return streamers;
  };

  onlineStreamers = e => {
    e.preventDefault();
    this.findStreamers(this.state.userinput)
      .then(streamers => {
        let url = `https://api.twitch.tv/helix/streams?`;

        streamers.forEach(streamer => {
          url += `user_id=${streamer}&`;
        });

        return fetch(url, myHeaders);
      })
      .then(response => response.json())
      .then(json => {
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

        this.setState({ streamers, userinput: "", loading: false });
      })
      .catch(e => e.message);
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div className="App">
        <Layout className="layout">
          <FollowMenu />
          <FollowContent
            onlineStreamers={this.onlineStreamers}
            username={this.state.username}
            onChange={this.onChange}
            userinput={this.state.userinput}
            streamers={this.state.streamers}
          />

          <Footer>Twitch Api</Footer>
        </Layout>
      </div>
    );
  }
}

export default Following;
