import React from "react";
import { List, Card } from "antd";

const StreamerList = props => {
  return (
    <div>
      <h2>{props.list.length} Streamers Online</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={props.list}
        renderItem={item => (
          <List.Item>
            <Card hoverable={true} title={item.name}>
              <img alt="" src={item.thumbnail} />
              <br />
              <span style={{ color: "red" }}> {item.viewers} </span>
              Viewers
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default StreamerList;
