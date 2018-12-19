import React from "react";
import "./following.css";
import StreamerList from "./streamerlist";
import { Button, Input, Breadcrumb, Layout } from "antd";

const { Content } = Layout;

const FollowContent = props => (
  <Content>
    <div>
      <Breadcrumb style={{ margin: "50px 0" }} />
      <div
        style={{
          background: "#fff"
        }}
      >
        <div className="searchForm">
          <h2>See whose online</h2>

          <form onSubmit={props.onlineStreamers}>
            <Input
              onChange={props.onChange}
              type="text"
              placeholder="enter your username"
              value={props.userinput}
            />
            <br />
            <Button type="primary">search</Button>
          </form>
        </div>
      </div>
    </div>
    <div className="list">
      {props.username !== "" ? <StreamerList list={props.streamers} /> : ""}
    </div>
  </Content>
);

export default FollowContent;
