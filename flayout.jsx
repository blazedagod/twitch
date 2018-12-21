import React, { useContext } from "react";
import "./app.css";
import { Layout } from "antd";
import TwitchMenu from "./twitchmenu.js";
import TwitchContent from "./twitchcontent.js";
import { myContext } from "./twitchcontext";

const { Footer } = Layout;

const FollowLayout = () => {
  const { searchtext, userid } = useContext(myContext);
  return (
    <div className="App">
      <Layout className="layout">
        <TwitchMenu menukey={"1"} />
        <TwitchContent searchtext={searchtext} userid={userid} />

        <Footer>Twitch Api</Footer>
      </Layout>
    </div>
  );
};

export default FollowLayout;
