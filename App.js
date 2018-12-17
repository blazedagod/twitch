import React, { Component } from "react";
import StreamerList from "./streamerlist";
import "./App.css";
import { Button, Input, Menu, Breadcrumb, Layout } from "antd";

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = { userinput: "", username: "", streamers: [] };

  onchange = e => this.setState({ userinput: e.target.value });

  findId = name => {
    const url = `https://api.twitch.tv/helix/users?login=${name}`;
    const id = fetch(url, {
      headers: { "Client-ID": "mftf7euslgudgbke20l34acp24shbw" }
    })
      .then(response => response.json())
      .then(json => {
        const id = json.data[0].id;
        this.setState({ username: id });
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
        let streamers = json.data.map(streamer => {
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

        this.setState({ streamers, userinput: "" });
      })
      .catch(e => e.message);
  };

  render() {
    return (
      <div className="App">
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">Following</Menu.Item>
              <Menu.Item key="2">Top Streams</Menu.Item>
              <Menu.Item key="3">Top Games</Menu.Item>
            </Menu>
          </Header>
          <Content>
            <div style={{ padding: "0 0px" }}>
              <Breadcrumb style={{ margin: "50px 0" }} />
              <div
                style={{
                  background: "#fff"
                }}
              >
                <div className="searchForm">
                  <h2>See whose online</h2>

                  <form onSubmit={this.onlineStreamers}>
                    <Input
                      onChange={this.onchange}
                      type="text"
                      placeholder="enter your username"
                      value={this.state.userinput}
                    />
                    <br />
                    <Button type="primary">search</Button>
                  </form>
                </div>
              </div>
            </div>
            <div className="list">
              {this.state.username !== "" ? (
                <StreamerList list={this.state.streamers} />
              ) : (
                ""
              )}
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }}>Twitch Api</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
