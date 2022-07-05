import { useEffect, useRef, useState } from "react";
import DataGridComponent from "../../components/DataGrid/DataGrid";
import SearchAndFilters from "../SearchAndFilters/SearchAndFilters";

const Main = () => {
  const [characters, setCharacters] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [countPages, setCountPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState(null);
  const [showPagination, setShowPagination] = useState(true);

  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const [doEffect, setDoEffect] = useState(true);

  // popup
  const [open, setOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(true);
  const initialRun = useRef(true);

  const [filterTriggered, setFilterTriggered] = useState(false);

  const handleOpen = (row) => {
    setOpen(true);
    setPopupContent(row);
  };

  const handleClose = () => setOpen(false);

  // function clear all :
  // 1- filterTriggered = false
  // 2- doEffect
  // 3- Reset all fields

  const clear = () => {
    if (filterTriggered == true) {
      setFilterTriggered(false);
      setDoEffect(!doEffect);
      setSearch("");
      setFilterGender(null);
      setFilterStatus(null);
      setPageNumber(1);
    }
  };

  const filterCharacters = (pageNumber, gender, status, search) => {
    setSearch(search);
    setGender(gender);
    setStatus(status);
    setPageNumber(pageNumber);
    setFilterTriggered(true);
    setDoEffect(!doEffect);
  };

  useEffect(() => {
    // if (initialRun.current) {
    //     console.log("Initial run");
    //     initialRun.current = false;
    // } else {
    //     console.log("Not initial run");
    // }

    if (initialRun.current) initialRun.current = false;

    // console.log("Happen useEffect");

    let timeout = setTimeout(() => {
      // console.log("Starting fetch... ");

      let arr = [];
      let url = "";
      if (filterTriggered == true) {
        url = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${
          search ? search : ""
        }`;
        url += gender ? `&gender=${gender}` : "";
        url += status ? `&status=${status}` : "";
      } else {
        url = `https://rickandmortyapi.com/api/character?page=${pageNumber}`;
      }

      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          json && setCountPages(json.info.pages);
          arr = json.results.map((character) => {
            return {
              id: character.id,
              col1: character.image,
              col2: character.name,
              col3: character.origin?.name,
              col4: character.status,
              col5: character.species,
              col6: character.gender,
              episodes: character.episode,
            };
          });
        })
        .then(() => {
          setData(arr);
          setCharacters(arr);
          setShowPagination(true);
        })
        // If there is no data that fits to the search
        .catch(() => {
          setCountPages(1);
          setData([]);
          setShowPagination(false);
        });
    }, 800);

    // Will happen on finishing effect
    return () => {
      // console.log("Effect finished");
      clearTimeout(timeout);
    };
  }, [doEffect]);

  return (
    <div className="rnm-page">
      <SearchAndFilters
        search={search}
        pageNumber={pageNumber}
        filterGender={filterGender}
        filterStatus={filterStatus}
        setPageNumber={setPageNumber}
        setSearch={setSearch}
        filterCharacters={filterCharacters}
        setFilterGender={setFilterGender}
        setFilterStatus={setFilterStatus}
        clear={clear}
      />
      <DataGridComponent
        filteredResults={data}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setPageNumber={setPageNumber}
        filterCharacters={filterCharacters}
        filterGender={filterGender}
        filterStatus={filterStatus}
        search={search}
        countPages={countPages}
        pageNumber={pageNumber}
        showPagination={showPagination}
        open={open}
        handleOpen={handleOpen}
        popupContent={popupContent}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Main;
