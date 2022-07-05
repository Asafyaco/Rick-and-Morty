import "./Popup.scss";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";

const Popup = ({ open, handleClose, popupContent }) => {
  const [firstEpisode, setFirstEpisode] = useState({});
  const [lastEpisode, setLastEpisode] = useState({});

  useEffect(() => {
    if (open && popupContent?.episodes?.length > 0) {
      // console.log("popup content = ", popupContent);
      fetch(popupContent.episodes[0])
        .then((resultData) => {
          return resultData.json();
        })
        .then((data) => {
          setFirstEpisode(data);
          if (popupContent?.episodes?.length === 1) {
            setLastEpisode(data);
          }
          return data;
        });

      if (popupContent?.episodes?.length !== 1) {
        fetch(popupContent.episodes[popupContent?.episodes?.length - 1])
          .then((resultData) => {
            return resultData.json();
          })
          .then((data) => {
            setLastEpisode(data);
            return data;
          });
      }
    }
  }, [open]);

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

          <div className="character-details">
            <h1 className="character-name">{popupContent?.col2}</h1>
            <h3>First episode - {firstEpisode?.episode}</h3>
            {firstEpisode?.air_date != lastEpisode?.air_date && <h3> {firstEpisode?.air_date}</h3> }
            <hr />
            <h3>Last episode - {lastEpisode?.episode}</h3>
            {lastEpisode?.air_date != firstEpisode?.air_date && <h3> {lastEpisode?.air_date}</h3> }
            <hr />
            {firstEpisode?.air_date == lastEpisode?.air_date && <h3>{firstEpisode.air_date}</h3>}
            <h3>Episodes total - {popupContent.episodes?.length}</h3>
          </div>
          
        </Box>
      </Modal>
    </div>
  );
};

export default Popup;
