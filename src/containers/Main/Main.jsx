import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import DataGridComponent from "../../components/DataGrid/DataGrid";
import Pagination from "@mui/material/Pagination";
import SearchAndFilters from "../SearchAndFilters/SearchAndFilters";

const Main = () => {
    const [characters, setCharacters] = useState([]);
    const [pageSize, setPageSize] = useState(20);
    const [countPages, setCountPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [filteredResults, setFilteredResults] = useState(null);
    const [showPagination, setShowPagination] = useState(true);
  
    const [search, setSearch] = useState("");
    const [filterGender, setFilterGender] = useState("");
    const [filterStatus, setFilterStatus] = useState("");

    // popup
    const [open, setOpen] = useState(false);
    const [popupContent, setPopupContent] = useState(true);

    const handleOpen = (row) => {setOpen(true); setPopupContent(row)};
    const handleClose = () => setOpen(false);

    const filterCharacters = (pageNumber, gender, status, search) => {
      let temp = [];
      let url = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search ? search : ''}`;
      url += gender ? `&gender=${gender}` : '';
      url += status ? `&status=${status}` : '';
      fetch(url)
        .then((resultData) => {
          return resultData.json();
        })
        .then((data) => {
          setCountPages(data.info.pages);
          // console.log(data?.results);
            temp = data?.results.map((character) => {
              return {
                id : character.id,
                col1 : character.image,
                col2 : character.name,
                col3 : character.origin?.name,
                col4 : character.status,
                col5 : character.species,
                col6 : character.gender,
                episodes: character.episode
              };
            });
            setFilteredResults(temp);
            setShowPagination(true);
          })
        .catch(() => {
          setCountPages(1);
          setFilteredResults([]);
          setShowPagination(false);
        });
    };
  
    useEffect(() => {
      let arr = [];
      let initURL = `https://rickandmortyapi.com/api/character?page=${pageNumber}`;
      fetch(initURL)
        .then((res) => res.json())
        .then((json) => {
          json && setCountPages(json.info.pages);
          arr = json.results.map((character) => {
            return {
              id : character.id,
              col1 : character.image,
              col2 : character.name,
              col3 : character.origin?.name,
              col4 : character.status,
              col5 : character.species,
              col6 : character.gender,
              episodes: character.episode
            };
          });
        })
        .then(() => {
          // console.log(arr);
          setFilteredResults(arr);
          setCharacters(arr);
        });
    }, []);  

  return (
    <div className="rnm-page">
      <SearchAndFilters search={search} pageNumber={pageNumber} filterGender={filterGender} filterStatus={filterStatus} setPageNumber={setPageNumber} setSearch={setSearch} filterCharacters={filterCharacters} setFilterGender={setFilterGender} setFilterStatus={setFilterStatus}/>
          <DataGridComponent filteredResults={filteredResults} pageSize={pageSize} setPageSize={setPageSize} setPageNumber={setPageNumber} filterCharacters={filterCharacters} filterGender={filterGender} filterStatus={filterStatus} search={search} countPages={countPages} pageNumber={pageNumber} showPagination={showPagination} open={open} handleOpen={handleOpen} popupContent={popupContent} handleClose={handleClose}/>
    </div>
  );
};

export default Main;
