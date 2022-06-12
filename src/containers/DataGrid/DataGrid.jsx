import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useState } from "react";
import "./DataGrid.css";

const columns = [
  { field: "col1", headerName: "", width: 150 },
  { field: "col2", headerName: "Character Name", width: 280 },
  { field: "col3", headerName: "Origin", width: 280 },
  { field: "col4", headerName: "Status", width: 280 },
  { field: "col5", headerName: "Species", width: 280 },
  { field: "col6", headerName: "Gender", width: 180 },
];

const DataView = () => {
  const [characters, setCharacters] = useState([]);
  const [pageSize, setPageSize] = useState(20);

  const [characterId, setCharacterId] = useState("");

  const handleChange = (e) => {
    setCharacterId(e.target.value);
  };

  let arr = [];

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((res) => res.json())
      .then((json) =>
        json.results.map((character) => {
          let obj = {};
          obj.id = character.id;
          obj.col1 = character.image;
          obj.col2 = character.name;
          obj.col3 = character.origin?.name;
          obj.col4 = character.status;
          obj.col5 = character.species;
          obj.col6 = character.gender;
          arr.push(obj);
        })
      )
      .then(() => {
        setCharacters(arr);
      });
  }, []);

  return (
    <div className="rnm-page">
      <div className="rnm-select-inputs">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={characterId}
            onChange={handleChange}
          >
            {characters.length !== 0 &&
              characters.map((e, index) => {
                return (
                  <MenuItem value={e._id} key={index}>
                    {e.gender}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={characterId}
            onChange={handleChange}
          >
            {characters.length !== 0 &&
              characters.map((e, index) => {
                return (
                  <MenuItem value={e._id} key={index}>
                    {e.gender}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        <Button className="clear-button" variant="contained">
          clear all
        </Button>
      </div>

      <div className="rnm-data-grid">
        {characters.length !== 0 && (
          <DataGrid
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
            rows={characters}
            columns={columns}
          />
        )}
      </div>
    </div>
  );
};

export default DataView;
