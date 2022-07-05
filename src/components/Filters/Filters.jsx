import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { GENDER, STATUS } from "../../consts";
import ClearIcon from "@mui/icons-material/Clear";
import "./Filters.scss";

const Filters = ({
  search,
  setSearch,
  filterGender,
  filterStatus,
  setPageNumber,
  filterCharacters,
  setFilterGender,
  setFilterStatus,
  clear,
}) => {
  const handleChangeGender = (e) => {
    setPageNumber(1);
    setFilterGender(e.target.value);
    filterCharacters(1, e.target.value, filterStatus, search);
  };

  const handleChangeStatus = (e) => {
    setPageNumber(1);
    setFilterStatus(e.target.value);
    filterCharacters(1, filterGender, e.target.value, search);
  };

  return (
    <div className="rnm-select-inputs">
      <FormControl fullWidth variant="standard">
        <InputLabel>Gender</InputLabel>
        <Select onChange={handleChangeGender} value={filterGender}>
          {GENDER.map((e, index) => {
            return (
              <MenuItem value={e} key={index}>
                {e}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="standard">
        <InputLabel>Status</InputLabel>
        <Select onChange={handleChangeStatus} value={filterStatus}>
          {STATUS.map((e, index) => {
            return (
              <MenuItem value={e} key={index}>
                {e}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Button
        className="clear-button"
        variant="contained"
        endIcon={<ClearIcon />}
        onClick={() => {
          // filterCharacters(1, null, null, "");
          // setSearch("");
          // setFilterGender(null);
          // setFilterStatus(null);
          // setPageNumber(1);

          clear();
        }}
      >
        clear all
      </Button>
    </div>
  );
};

export default Filters;
