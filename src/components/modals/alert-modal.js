import React from "react";
import Modal from "react-modal";
import PikachuDenial from "../../assets/gif/pikachu-denial.gif";
const Alert = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "55vw",
      height: "40vh",
      padding: 0,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",

    },
  };
  Modal.setAppElement("#root");


  const closeModal = () => {
    props.handleClose();
  };

  return (
    <React.Fragment>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <img className='alert-gif' src={PikachuDenial} alt="pokemon pikachu gif denial"></img>
      </Modal>
    </React.Fragment>
  );
};

export default Alert;
