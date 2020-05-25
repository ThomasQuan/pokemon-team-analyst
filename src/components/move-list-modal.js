import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
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

  const [moveList, setMoveList] = useState([]);
  const [nextBatch , setNextBatch] = useState(20);

  useEffect(()=>{
    setMoveList(props.moveList)
    if(props.move_id.length !== 0)
    {
      for(var i = 0 ; i < 20 ; i++)
      {
        axios.get(`https://pokeapi.co/api/v2/move/${props.move_id[i]}`).then(
          res=>{
            console.log(res.data)
          }
        )
      }
    }
  },[props.move_id,props.moveList])


  const closeModal = () => {
    props.handleClose();
  };

  const select_move = (move) => {
    closeModal();
  };

  const load_more=()=>{
    setNextBatch(nextBatch+20)
  }
  return (
    <React.Fragment>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>MOVE LIST</h2>
        <button onClick={load_more}> LOAD MORE</button>
        {moveList.slice(0,nextBatch).map((key, index) => (
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
