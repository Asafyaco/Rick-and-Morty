import { TextField } from "@mui/material";
import "./Search.scss";

import styled from "styled-components";
export const RNMSearch = styled.div`
  padding: 1em
`;

const Search = ({
  search,
  pageNumber,
  filterGender,
  filterStatus,
  setPageNumber,
  setSearch,
  filterCharacters,
}) => {
  const handleSearchCharacter = (e) => {
    setPageNumber(1);
    // console.log(pageNumber);
    setSearch(e.target.value);
    filterCharacters(1, filterGender, filterStatus, e.target.value);
  };

  return (
    <>
      <RNMSearch className="rnm-search">
        <TextField
          fullWidth
          className="textField"
          label="Search"
          variant="outlined"
          onChange={handleSearchCharacter}
          value={search}
        />
      </RNMSearch>
    </>
  );
};

export default Search;
