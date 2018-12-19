import React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";
import "./app.css";

const { Header } = Layout;

const TwitchMenu = props => (
  <Header>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={props.menukey}
      style={{ lineHeight: "64px" }}
    >
      <Menu.Item key="1">
        <Link to="/">Following</Link>
      </Menu.Item>

      <Menu.Item key="2">
        <Link to="/topstreams">Top Streams</Link>
      </Menu.Item>

      <Menu.Item key="3">
        <Link to="/topgames">Top Games</Link>
      </Menu.Item>
    </Menu>
  </Header>
);

export default TwitchMenu;
