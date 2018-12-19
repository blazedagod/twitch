import React from "react";
import "./app.css";
import { Layout } from "antd";
import TwitchMenu from "./twitchmenu.js";
import TwitchContent from "./twitchcontent.js";

const { Footer } = Layout;

const FollowLayout = props => (
  <div className="App">
    <Layout className="layout">
      <TwitchMenu menukey="1" />
      <TwitchContent
        searchtext="enter your username"
        heading={props.heading}
        onSubmit={props.onSubmit}
        username={props.username}
        onChange={props.onChange}
        userinput={props.userinput}
        streamers={props.streamers}
      />

      <Footer>Twitch Api</Footer>
    </Layout>
  </div>
);

export default FollowLayout;
