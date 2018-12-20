import React from "react";
import "./app.css";
import StreamerList from "./streamerlist.jsx";
import { Breadcrumb, Layout, Pagination } from "antd";
import SearchForm from "./searchform.jsx";

const { Content } = Layout;

const TwitchContent = props => (
  <Content>
    <div>
      <Breadcrumb style={{ margin: "50px 0" }} />
      <div
        style={{
          background: "#fff"
        }}
      />
      {props.searchtext && (
        <SearchForm
          onSubmit={props.onSubmit}
          onChange={props.onChange}
          userinput={props.userinput}
          searchtext={props.searchtext}
        />
      )}
    </div>
    <div className="list">
      {props.username !== "" && (
        <React.Fragment>
          <StreamerList heading={props.heading} list={props.list} />
          <Pagination defaultCurrent={1} total={10} />
        </React.Fragment>
      )}
    </div>
  </Content>
);

export default TwitchContent;
