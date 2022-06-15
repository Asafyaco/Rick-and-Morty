import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { GENDER, STATUS } from "./consts";
import "./DataGrid.css";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const columns = [
  {
    field: "col1",
    headerName: "",
    width: 70,
    renderCell: (params) => (
      <img src={params.value} width="45px" style={{ borderRadius: "100px" }} />
    ),
  },
  { field: "col2", headerName: "Character Name", width: 280 },
  { field: "col3", headerName: "Origin", width: 280 },
  { field: "col4", headerName: "Status", width: 280 },
  { field: "col5", headerName: "Species", width: 280 },
  { field: "col6", headerName: "Gender", width: 250 },
];

const DataView = () => {
  const [characters, setCharacters] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [countPages, setCountPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [filteredResults, setFilteredResults] = useState([]);

  const [search, setSearch]= useState()
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleChangeGender = (e) => {
    setFilterGender(e.target.value);
    filterCharacters(pageNumber, e.target.value, filterStatus, search);
    
  };
  const handleChangeStatus = (e) => {
    setFilterStatus(e.target.value);
    filterCharacters(pageNumber, filterGender, e.target.value, search);
  };
  const handleSearchCharacter = (e) => {
    setSearch(e.target.value);
    filterCharacters(pageNumber, filterGender, filterStatus, e.target.value);
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value);
    filterCharacters(value, filterGender, filterStatus, search);
  };

  const filterCharacters = (pageNumber, gender, status, search) => {
    var temp = [];
    var url = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search ? search : ''}`;
    url += gender ? `&gender=${gender}` : '';
    url += status ? `&status=${status}` : '';
    // console.log(url);
    fetch(url)
      .then((resultData) => {
        return resultData.json()
      })
      .then(data => {
        // console.log(data?.results);
        data?.results.map((character) => {
          let obj = {};
          obj.id = character.id;    
          obj.col1 = character.image;
          obj.col2 = character.name;
          obj.col3 = character.origin?.name;
          obj.col4 = character.status;
          obj.col5 = character.species;
          obj.col6 = character.gender;
          temp.push(obj);
          // console.log(temp);
        });
        setFilteredResults(temp);
        setCountPages(data.info.pages)
      })
      .catch(() => {
        setCountPages(1);
        setFilteredResults([]);
      })
  }
  
  useEffect(() => {
    let arr = [];
    let initURL = `https://rickandmortyapi.com/api/character?page=${pageNumber}`
    fetch(initURL)
      .then((res) => res.json())
      .then((json) => {
        json && setCountPages(json.info.pages);
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
        });
      })
      .then(() => {
        // console.log(arr);
        setFilteredResults(arr)
        setCharacters(arr);
      });
  }, []);

  return (
    <div className="rnm-page">
          <div className="rnm-search">
      <TextField fullWidth
        className="textField"
        id="outlined-basic"
        label="Search"
        variant="outlined"
        onChange={handleSearchCharacter}
        value={search}
        />
    </div>
      <div className="rnm-select-inputs">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChangeGender}
            value={filterGender}
          >
            {GENDER.map((e, index) => {
              return (
                <MenuItem value={e} key={index}>
                  {e}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChangeStatus}
            value={filterStatus}
          >
            {STATUS.map((e, index) => {
              return (
                <MenuItem value={e} key={index} >
                  {e}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Button className="clear-button" variant="contained" endIcon={<ClearIcon/>} onClick={()=>{
          filterCharacters(1, null, null, " ");
          setSearch(" ");
          setFilterGender(null);
          setFilterStatus(null);
          setPageNumber(1);
        }}>
          clear all
        </Button>
      </div>

      <Box sx={{ height: 200, width: 1, mb: 2 }}>
        <div className="rnm-data-grid">
          {filteredResults?.length !== 0 ? (
            <DataGrid
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              pagination
              rows={filteredResults}
              columns={columns}
              rowsPerPageOptions={[pageSize]}
            />
          ) : <div className="rnm-data-grid-no-results">
               <img src="https://www.ahb.com.mv/assets/img/empty-placeholder.png" alt="no-results" />
                No results
            </div>}
          <div className="pagination">
            <Stack spacing={2}>
              <Pagination
                count={countPages}
                color="primary"
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default DataView;
