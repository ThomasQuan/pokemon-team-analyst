import React from "react";
import DamageClassDetector from "../utils/damage-class-detector";
import { v4 as uuidv4 } from "uuid";

const MoveAttribute = (props) => {
  return (
    <React.Fragment>
      {props.moveList.map((move) => (
        <div className="move-detail-container" key={uuidv4()}>
          <div className="move-detail-container-title">
            <h3>{move.name}</h3>
            <img
              alt="damage-class"
              src={DamageClassDetector(move.damage_class)}
            ></img>
          </div>
          <ul>
            <li>Accuracy : {move.accuracy}</li>
            <li>Damage Class : {move.damage_class}</li>
            <li>Effeect Chance : {move.effect_chance}</li>
            <li>Power : {move.power}</li>
            <li>PP : {move.pp}</li>
            <li>Priority : {move.priority}</li>
            <li>Target : {move.target}</li>
            <li>Type : {move.type}</li>
          </ul>
        </div>
      ))}
    </React.Fragment>
  );
};

export default MoveAttribute;
