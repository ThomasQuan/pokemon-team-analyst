import React, { useState, useEffect } from "react";
import Next from "../assets/images/next.png";
import TypeDetector from "./types_detector";
import axios from "axios";
const TeamAnalysis = (props) => {
  const [selectedPokemon] = useState(
    props.location.pokemons.selected
  );
  // props.location.pokemons.selected
  const [pokemonData, setPokemonData] = useState([
    // { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/", id: "3" },
    // {
    //   name: "charmander",
    //   url: "https://pokeapi.co/api/v2/pokemon/4/",
    //   id: "4",
    // },
    // {
    //   name: "charmeleon",
    //   url: "https://pokeapi.co/api/v2/pokemon/5/",
    //   id: "5",
    // },
    // { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/", id: "6" },
    // { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/", id: "7" },
    // { name: "wartortle", url: "https://pokeapi.co/api/v2/pokemon/8/", id: "8" },
  ]);

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
              base_stat: res.data.stats,
            })
          );
        });
    }
  }, []);

  return (
    <React.Fragment>
      <div className="team-analyst-container">
        <div className="selected-pokemon-detail">
          {console.log(pokemonData)}
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
                  <div>
                    <img src={Next} alt="flaticon"></img>Move1
                  </div>
                  <div>
                    <img src={Next} alt="flaticon"></img>Move2
                  </div>
                  <div>
                    <img src={Next} alt="flaticon"></img>Move3
                  </div>
                  <div>
                    <img src={Next} alt="flaticon"></img>Move4
                  </div>
                </div>
              </div>

              {/* {
                key.base_stat.map(el=>(<div><ul><li>STAT NAME : {el.stat.name}  ==> {el.base_stat}</li></ul></div>))
              } */}
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TeamAnalysis;
