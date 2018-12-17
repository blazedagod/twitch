import React, { Component } from "react";
import StreamerList from "./streamerlist";

class App extends Component {
  state = { userinput: "", streamers: [] };

  onchange = e => this.setState({ userinput: e.target.value });

  findId = name => {
    const url = `https://api.twitch.tv/helix/users?login=${name}`;
    const id = fetch(url, {
      headers: { "Client-ID": "mftf7euslgudgbke20l34acp24shbw" }
    })
      .then(response => response.json())
      .then(json => {
        const id = json.data[0].id;
        return id;
      })
      .catch(e => console.log(e));
    return id;
  };

  findStreamers = name => {
    const streamers = this.findId(name)
      .then(id => {
        const url = `https://api.twitch.tv/helix/users/follows?from_id=${id}&first=50`;
        const myHeaders = {
          headers: { "Client-ID": "mftf7euslgudgbke20l34acp24shbw" }
        };

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
        let myHeaders = {
          headers: { "Client-ID": "mftf7euslgudgbke20l34acp24shbw" }
        };
        let url = `https://api.twitch.tv/helix/streams?`;

        streamers.forEach(streamer => {
          url += `user_id=${streamer}&`;
        });

        return fetch(url, myHeaders);
      })
      .then(response => response.json())
      .then(json => {
        console.log(json.data[0].thumbnail_url);
        let liveStreams = json.data.map(streamer => {
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

        let streamers = [...this.state.streamers, ...liveStreams];
        this.setState({ streamers, userinput: "" });
      })
      .catch(e => e.message);
  };

  render() {
    return (
      <div style={{ textAlign: "center" }} className="App">
        <header style={{ backgroundColor: "purple" }}>
          <h1 style={{ color: "white" }}>Twitch Api</h1>
        </header>
        <div>
          <h2>See whose online</h2>
          <form onSubmit={this.onlineStreamers} className="Form" id="user">
            <input
              onChange={this.onchange}
              type="text"
              placeholder="enter your username"
              value={this.state.userinput}
            />
            <br />
            <button>search</button>
          </form>
          <br />
        </div>
        <div>
          {this.state.streamers.length > 0 ? (
            <StreamerList list={this.state.streamers} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default App;
