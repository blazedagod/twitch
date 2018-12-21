import React from "react";
import "./app.css";
import { Layout } from "antd";
import TwitchMenu from "./twitchmenu.js";
import TwitchContent from "./twitchcontent.js";

const { Footer } = Layout;

const TSLayout = props => (
  <div className="App">
    <Layout className="layout">
      <TwitchMenu menukey="2" />
      <TwitchContent heading="Top Streams" list={props.list} />
      <Footer>Twitch Api</Footer>
    </Layout>
  </div>
);

export default TSLayout;
