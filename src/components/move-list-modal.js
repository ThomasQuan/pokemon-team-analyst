import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DialogBorder from "../assets/images/dialog_box.png";
const MoveList = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50vw",
      height: "80vh",
      padding: 0,
      border: "10px solid transparent",
      borderImage: `url(${DialogBorder}) 30 round`,
    },
  };
  Modal.setAppElement("#root");

  const [moveList, setMoveList] = useState(props.moveList);
  useEffect(() => {}, []);
  const closeModal = () => {
    props.handleClose();
  };

  const select_move = (move) => {
    console.log(props.pokemon_name)
    props.picked_move(move, props.pokemon_name);
  };
  return (
    <React.Fragment>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>MOVE LIST</h2>
        {props.moveList.map((key, index) => (
          <div key={index}>
            <ul>
              <li
                onClick={() => {
                  select_move(key);
                }}
              >
                NUMBER : {index} ==> {key.name}
              </li>
            </ul>
          </div>
        ))}
      </Modal>
    </React.Fragment>
  );
};

export default MoveList;
