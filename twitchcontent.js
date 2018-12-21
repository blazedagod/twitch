import React from "react";
import "./app.css";
import StreamerList from "./streamerlist.jsx";
import { Breadcrumb, Layout, Pagination } from "antd";
import SearchForm from "./searchform.jsx";

const { Content } = Layout;

const TwitchContent = props => {
  return (
    <Content>
      <div>
        <Breadcrumb style={{ margin: "50px 0" }} />
        <div
          style={{
            background: "#fff"
          }}
        />
        <div>
          <figure>
            <svg
              overflow="visible"
              width="45x"
              height="45px"
              version="1.1"
              viewBox="0 0 30 30"
              x="0px"
              y="0px"
            >
              <g>
                <path d="M4,7 L5.56799,3 L27,3 L27,18 L21,24 L16,24 L12.88599,27 L9,27 L9,24 L4,24 L4,7 Z M21,20 L25,16 L25,5 L8,5 L8,20 L12,20 L12,23 L15,20 L21,20 Z" />
                <g>
                  <polygon points="21 9 19 9 19 15 21 15" />
                  <polygon points="16 9 14 9 14 15 16 15" />
                </g>
              </g>
            </svg>
          </figure>
        </div>

        {props.searchtext && <SearchForm />}
      </div>
      <div className="list">
        {props.userid !== "" && (
          <React.Fragment>
            <StreamerList />
            <Pagination defaultCurrent={1} total={10} />
          </React.Fragment>
        )}
      </div>
    </Content>
  );
};

export default TwitchContent;
