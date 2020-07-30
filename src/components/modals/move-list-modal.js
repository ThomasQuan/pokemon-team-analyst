import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Next from "../../assets/images/next.png";

import DialogBorder from "../../assets/images/dialog_box.png";
const MoveList = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "60%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50vw",
      height: "65vh",
      padding: 0,
      border: "10px solid transparent",
      borderImage: `url(${DialogBorder}) 30 round`,
    },
  };
  Modal.setAppElement("#root");

  const [moveList, setMoveList] = useState([]);

  useEffect(() => {
    setMoveList(props.moveList);
  }, [props.moveList]);

  const closeModal = () => {
    props.handleClose();
  };

  const select_move = (move) => {
    props.picked_move(move, props.pokemon_name, props.move_slot);
    closeModal();
  };

  return (
    <React.Fragment>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2 className="modal-title">MOVE LIST</h2>
        {moveList.map((key, index) => (
          <div className="move-container" key={index}>
            <ul>
              <li
                onClick={() => {
                  select_move(key);
                }}
              >
                <img src={Next} alt="flaticon"></img>
                {key.name}
              </li>
            </ul>
          </div>
        ))}
      </Modal>
    </React.Fragment>
  );
};

export default MoveList;
