import React from "react";
import "./following.css";
import { Spin } from "antd";

const Loading = () => (
  <div style={{ textAlign: "center", marginTop: 250 }}>
    <Spin size="large" />
  </div>
);

export default Loading;
