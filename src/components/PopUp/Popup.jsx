import "./Popup.scss";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { useState } from "react";

const Popup = ({ open, handleClose, popupContent }) => {
  const [currentEpisodes, setCurrentEpisodes] = useState([]);

  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: "50%",
  //   bgcolor: "#fff",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  //   display: "flex",
  //   justifyContent: "space-around",
  // };

  const getEpisodes = (url) => {
    fetch(url)
      .then((resultData) => {
        resultData.json();
      })
      .then((data) => {
        return data;
      });
  };

  if (popupContent){
    let e = popupContent.episodes;
    console.log(e);  
  }

  return (
    <div className="popup-area">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style} className="box-style"> */}
        <Box className="box-style">
          <img
            className="character-image-popup"
            src={popupContent.col1}
            alt="character-image-popup"
          />
          
          {/* <h3>First episode - {getEpisodes(popupContent?.episodes[0])}</h3> */}
          {/* <h3>Last episode - {getEpisodes(popupContent?.episodes[popupContent?.episodes?.length - 1])}</h3> */}
        </Box>
      </Modal>
    </div>
  );
};

export default Popup;
