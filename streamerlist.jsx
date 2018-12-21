import React, { useContext } from "react";
import "./app.css";
import { List, Card } from "antd";
import { myContext } from "./twitchcontext";

const StreamerList = () => {
  const { heading, changeList, list } = useContext(myContext);
  return (
    <div>
      <h1 style={{ marginBottom: 35 }}>{heading}</h1>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <a
              href={item.url}
              onClick={() => {
                changeList(item.id, item.name);
              }}
            >
              <Card hoverable={true} title={item.name}>
                <img alt="" src={item.thumbnail} />
                <br />
                {item.viewers && (
                  <div>
                    <span style={{ color: "red" }}> {item.viewers} </span>
                    Viewers
                  </div>
                )}
              </Card>
            </a>
          </List.Item>
        )}
      />
    </div>
  );
};

export default StreamerList;
