import React from "react";
import "./app.css";
import { Layout } from "antd";
import TwitchMenu from "./twitchmenu.js";
import TwitchContent from "./twitchcontent.js";

const { Footer } = Layout;

const GamesLayout = props => (
  <div className="App">
    <Layout className="layout">
      <TwitchMenu menukey="3" />
      <TwitchContent heading="Top Games" list={props.list} />
      <Footer>Twitch Api</Footer>
    </Layout>
  </div>
);

export default GamesLayout;
