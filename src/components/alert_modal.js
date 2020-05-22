import React, { useEffect } from "react";
import Modal from "react-modal";
import PikachuDenial from "../assets/gif/pikachu-denial.gif";
const Alert = (props) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "30vw",
      height: "20vh",
      padding: 0,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",

    },
  };
  Modal.setAppElement("#root");
  const [modalState, setModal] = React.useState(false);

  //this need to be in the parent compoentn
  // const openModal = () => {
  //   setModal(true);
  const closeModal = () => {
    props.handleClose();
  };

  return (
    <React.Fragment>
      {console.log(modalState)}
      <Modal
        isOpen={props.isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>Maxium Pokemon allow exceeded</h2>
        <img className='alert-gif' src={PikachuDenial} alt="pokemon pikachu gif denial"></img>
      </Modal>
    </React.Fragment>
  );
};

export default Alert;
