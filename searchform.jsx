import React from "react";
import { Button, Input } from "antd";
import "./app.css";

const SearchForm = props => (
  <div className="searchForm">
    <h2>See whose online</h2>

    <form onSubmit={props.onSubmit}>
      <Input
        onChange={props.onChange}
        type="text"
        placeholder={props.searchtext}
        value={props.userinput}
      />
      <br />
      <Button type="primary">search</Button>
    </form>
  </div>
);

export default SearchForm;
