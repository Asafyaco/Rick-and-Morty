import { TextField } from "@mui/material";
import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  const [searchInput, setSearchInput] = useState();

  return (
    <div className="rnm-search">
      <TextField
        className="textField"
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
