import React from "react";
import "./app.css";
import { Layout } from "antd";
import TwitchMenu from "./twitchmenu.js";
import TwitchContent from "./twitchcontent.js";

const { Footer } = Layout;

const TopLayout = props => (
  <div className="App">
    <Layout className="layout">
      <TwitchMenu menukey={props.menukey} />
      <TwitchContent />
      <Footer>Twitch Api</Footer>
    </Layout>
  </div>
);

export default TopLayout;
