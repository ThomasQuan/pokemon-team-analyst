import React, { useState, useEffect } from "react";
import axios from "axios";
const TeamAnalysis = (props) => {
  const [selectedPokemon, setPokemon] = useState(
    props.location.pokemons.selected
  );
  const [pokemonData, setPokemonData] = useState([]);

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
      <div className="selected-pokemon">
        {pokemonData.map((key) => (
          <div key={key.id}>
            <img
              src={`https://pokeres.bastionbot.org/images/pokemon/${key.id}.png`}
              alt="pokemon"
              width="200px"
              height="200px"
            ></img>
            <h3>{key.name}</h3>
            
            {key.types.map((el) => (
              <ul key={el.type.name}>
                <li>{el.type.name}</li>
              </ul>
            ))}

              {
                key.base_stat.map(el=>(<div><ul><li>STAT NAME : {el.stat.name}  ==> {el.base_stat}</li></ul></div>))
              }
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default TeamAnalysis;
