import React, { useContext } from "react";
import { Button, Input } from "antd";
import "./app.css";
import { myContext } from "./twitchcontext";

const SearchForm = () => {
  const { onChange, onlineStreamers, searchtext, userinput } = useContext(
    myContext
  );
  return (
    <div className="searchForm">
      <h2>See whose online</h2>

      <form onSubmit={onlineStreamers}>
        <Input
          onChange={onChange}
          type="text"
          placeholder={searchtext}
          value={userinput}
        />
        <br />
        <Button type="primary">search</Button>
      </form>
    </div>
  );
};

export default SearchForm;
