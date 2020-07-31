import React, { useState } from "react";
import TypeDetector from "../utils/types-detector";
import MoveList from "../modals/move-list-modal";
import Next from "../../assets/images/next.png";

const PokemonTeamList = (props) => {
  const moveSize = [0, 1, 2, 3];
  const [modal, setModal] = useState({
    condition: false,
    move_list: [],
    pokemon_name: "",
    move_slot: [],
    move_id: [],
  });
  const handleOpen = (pokemon, index) => {
    if (pokemon.selected_move[index] === undefined) {
      setModal({
        condition: true,
        move_list: pokemon.moves,
        pokemon_name: pokemon.name,
        move_slot: index,
        move_id: pokemon.move_id,
      });
    }
  };

  const deletePokemonMove=(pokemonName)=>{
    const deleteAllMove = props.pokemonData.map((key) => {
      if (key.name === pokemonName) {
        return { ...key, selected_move: [] };
      } else {
        return key;
      }
    });
    console.log(deleteAllMove)
    props.setPokemonData(deleteAllMove);

  }
  const handleClose = () => {
    setModal({
      condition: false,
      move_list: [],
      pokemon_name: "",
      move_id: [],
    });
  };
  const display_move = (selected_move) => {
    if (selected_move === undefined) {
      return "not learn";
    } else {
      return selected_move.move.name;
    }
  };
  const setPickedPokemonFunc = (pokemon) => {
    props.setPickedPokemon({ picked_pokemon: pokemon });
  };

  const picked_move = (move, pokemon_name, index) => {
    const tempArr = props.pokemonData.map((key) => {
      if (key.name === pokemon_name) {
        key.selected_move.push({ index, move });
      }
      handleClose();
      return key;
    });
    props.setPokemonData(tempArr);
  };

  return (
    <React.Fragment>
      <div className="selected-pokemon-detail">
        {props.pokemonData.map((key) => (
          <div
            key={key.id}
            onClick={() => {
              setPickedPokemonFunc(key);
            }}
            className="pokemon-detail"
          >
            <div>
              <button className="delete-move-btn" onClick={()=>{deletePokemonMove(key.name)}}>Remove all moves</button>
              <div className="pokemon-title">
                <div>
                  {key.types.map((el) => (
                    <ul key={el.type.name}>
                      <li style={{ background: TypeDetector(el.type.name) }}>
                        {el.type.name}
                      </li>
                    </ul>
                  ))}
                </div>
                <img
                  className="selected-pokemon-img"
                  src={`https://pokeres.bastionbot.org/images/pokemon/${key.id}.png`}
                  alt="pokemon"
                ></img>
                <h4>{key.name}</h4>
              </div>

              <div className="pokemon-move-list">
                {moveSize.map((i) => (
                  <div
                    key={i}
                    onClick={() => {
                      handleOpen(key, i);
                    }}
                  >
                    <img src={Next} alt="flaticon"></img>
                    <p>{display_move(key.selected_move[i])}</p>
                  </div>
                ))}
              </div>

              <MoveList
                isOpen={modal.condition}
                moveList={modal.move_list}
                pokemon_name={modal.pokemon_name}
                move_slot={modal.move_slot}
                move_id={modal.move_id}
                handleClose={handleClose}
                picked_move={picked_move}
              ></MoveList>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default PokemonTeamList;
