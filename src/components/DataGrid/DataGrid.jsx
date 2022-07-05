import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import "./DataGrid.scss";
import Popup from "./../PopUp/Popup";

const DataGridComponent = ({
  filteredResults,
  pageSize,
  setPageSize,
  showPagination,
  setPageNumber,
  filterCharacters,
  filterGender,
  filterStatus,
  search,
  countPages,
  pageNumber,
  open,
  handleOpen,
  popupContent,
  handleClose,
}) => {
  const handlePageChange = (event, value) => {
    setPageNumber(value);
    filterCharacters(value, filterGender, filterStatus, search);
  };

  const handleOnClick = (row) => {
    handleOpen(row);
  };

  const columns = [
    {
      field: "col1",
      headerName: "",
      width: 70,
      renderCell: (params) => (
        <img
          src={params.value}
          width="45px"
          style={{ borderRadius: "100px" }}
        />
      ),
    },
    { field: "col2", headerName: "Character Name", width: 280 },
    { field: "col3", headerName: "Origin", width: 280 },
    { field: "col4", headerName: "Status", width: 280 },
    { field: "col5", headerName: "Species", width: 280 },
    { field: "col6", headerName: "Gender", width: 250 },
  ];

  return (
    <div>
      <Popup
        open={open}
        handleOpen={handleOpen}
        popupContent={popupContent}
        handleClose={handleClose}
      />

      <Box sx={{ height: 200, width: 1, mb: 2 }}>
        <div className="rnm-data-grid">
          {filteredResults?.length > 0 ? (
            <DataGrid
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              pagination
              rows={filteredResults}
              columns={columns}
              rowsPerPageOptions={[pageSize]}
              onRowClick={(param) => handleOnClick(param.row)}
            />
          ) : filteredResults === null ? (
            <CircularProgress />
          ) : (
            <div className="rnm-data-grid-no-results">
              <img
                src="https://www.ahb.com.mv/assets/img/empty-placeholder.png"
                alt="no-results"
              />
              No results
            </div>
          )}
        </div>

        <div className="pagination">
          {showPagination && (
            <Stack spacing={2}>
              <Pagination
                count={countPages}
                color="primary"
                onChange={handlePageChange}
                page={pageNumber}
              />
            </Stack>
          )}
        </div>
        
      </Box>
    </div>
  );
};

export default DataGridComponent;
