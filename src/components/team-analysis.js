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
  const [modal, setModal] = useState({ condition: false, move_list: [] });
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
            })
          );
        });
    }
  }, [selectedPokemon, pokemonData.selected_move]);

  const handleOpen = (pokemon) => {
    console.log(pokemon.name);
    setModal({
      condition: true,
      move_list: pokemon.moves,
      pokemon_name: pokemon.name,
    });
  };

  const handleClose = () => {
    setModal({ condition: false, move_list: [], pokemon_name: "" });
  };
  const picked_move = (move, pokemon_name) => {
    const tempArr = pokemonData.map((key) => {
      if (key.name === pokemon_name) {
        key.selected_move.push(move);
      }
      return key;
    });
    setPokemonData(tempArr);
    console.log(pokemonData);
  };

  return (
    <React.Fragment>
      <div className="team-analyst-container">
        <div className="selected-pokemon-detail">
          {pokemonData.map((key) => (
            <div key={key.id} className="pokemon-detail">
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
                      handleOpen(key);
                    }}
                  >
                    <img src={Next} alt="flaticon"></img>
                    SELECT MOVE
                  </div>
                </div>
                <MoveList
                  isOpen={modal.condition}
                  moveList={modal.move_list}
                  pokemon_name={modal.pokemon_name}
                  handleClose={handleClose}
                  picked_move={picked_move}
                ></MoveList>
              </div>
            </div>
          ))}
        </div>
        <PokemonStat></PokemonStat>
        <TeamResult></TeamResult>
      </div>
    </React.Fragment>
  );
};

export default TeamAnalysis;
