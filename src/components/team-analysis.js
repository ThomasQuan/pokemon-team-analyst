import React, { useState, useEffect } from "react";
import Next from "../assets/images/next.png";
import TypeDetector from "./types-detector";
import axios from "axios";
import PokemonStat from "./pokemon-stat";
import TeamResult from "./team-result";
import MoveList from "./move-list-modal";

const TeamAnalysis = (props) => {
  const [selectedPokemon] = useState(props.location.pokemons.selected);
  const [pokemonData, setPokemonData] = useState([]);
  const [modal, setModal] = useState({
    condition: false,
    move_list: [],
    pokemon_name: "",
    move_slot: [],
    move_id: [],
  });
  const [picked_pokemon, setPickedPokemon] = useState("");
  useEffect(() => {
    for (var i = 0; i < selectedPokemon.length; i++) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon[i].id}`)
        .then((res) => {
          setPokemonData((pokemonData) =>
            pokemonData.concat({
              id: res.data.id,
              name: res.data.name,
              types: res.data.types,
              moves: res.data.moves.map((key) => key.move),
              selected_move: [],
              base_stat: res.data.stats,
              move_id: res.data.moves.map((key) =>
                key.move.url.substr(31).replace(/\//g, "")
              ),
            })
          );
        });
    }
  }, [selectedPokemon, pokemonData.selected_move]);



  const handleOpen = (pokemon, index) => {
    if (pokemon.selected_move[index] !== undefined) {
      // const newArr = pokemon.selected_move.filter((key) => key.index !== index);
      // console.log(newArr)
      console.log("Future me, good luck creating a better deleting function");
    } else {
      setModal({
        condition: true,
        move_list: pokemon.moves,
        pokemon_name: pokemon.name,
        move_slot: index,
        move_id: pokemon.move_id,
      });
    }
  };

  const handleClose = () => {
    setModal({
      condition: false,
      move_list: [],
      pokemon_name: "",
      move_id: [],
    });
  };
  const picked_move = (move, pokemon_name, index) => {
    const tempArr = pokemonData.map((key) => {
      if (key.name === pokemon_name) {
        if (key.selected_move.length !== 4) {
          key.selected_move.push({ index, move });
        } else {
          handleClose();
        }
      }
      return key;
    });
    setPokemonData(tempArr);
  };

  const pick_pokemon=(pokemon) => {
    setPickedPokemon({ picked_pokemon: pokemon });
  };

  const display_move = (selected_move) => {
    if (selected_move === undefined) {
      return "SELECT MOVE";
    } else {
      return selected_move.move.name;
    }
  };

  return (
    <React.Fragment>
      <div className="team-analyst-container">
        <div className="selected-pokemon-detail">
          {pokemonData.map((key) => (
            <div
              key={key.id}
              onClick={() => {
                pick_pokemon(key);
              }}
              className="pokemon-detail"
            >
              <img
                src={`https://pokeres.bastionbot.org/images/pokemon/${key.id}.png`}
                alt="pokemon"
              ></img>

              <div>
                <div className="pokemon-title">
                  <h3>{key.name}</h3>
                  {key.types.map((el) => (
                    <ul key={el.type.name}>
                      <li style={{ background: TypeDetector(el.type.name) }}>
                        {el.type.name}
                      </li>
                    </ul>
                  ))}
                </div>
                <div className="pokemon-move-list">
                  <div
                    onClick={() => {
                      handleOpen(key, 0);
                    }}
                  >
                    <img src={Next} alt="flaticon"></img>
                    {display_move(key.selected_move[0])}
                  </div>

                  <div
                    onClick={() => {
                      handleOpen(key, 1);
                    }}
                  >
                    <img src={Next} alt="flaticon"></img>
                    {display_move(key.selected_move[1])}
                  </div>

                  <div
                    onClick={() => {
                      handleOpen(key, 2);
                    }}
                  >
                    <img src={Next} alt="flaticon"></img>
                    {display_move(key.selected_move[2])}
                  </div>

                  <div
                    onClick={() => {
                      handleOpen(key, 3);
                    }}
                  >
                    <img src={Next} alt="flaticon"></img>
                    {display_move(key.selected_move[3])}
                  </div>
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
        <PokemonStat pokemonData={pokemonData} picked_pokemon={picked_pokemon}></PokemonStat>
        <TeamResult></TeamResult>
      </div>
    </React.Fragment>
  );
};

export default TeamAnalysis;
