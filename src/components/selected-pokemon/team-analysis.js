import React, { useState, useEffect } from "react";

import axios from "axios";
import PokemonStat from "./pokemon-stat";
import PokemonTeamList from "./pokemon-team-list";

const TeamAnalysis = (props) => {
  const [selectedPokemon] = useState(props.location.pokemons.selected);
  const [pokemonData, setPokemonData] = useState([]);

  const [picked_pokemon, setPickedPokemon] = useState("");
  useEffect(() => {
    for (var i = 0; i < selectedPokemon.length; i++) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon[i].id}`)
        .then((res) => {
          //get and set damage relation
          let temp_dmg = [
            {
              double_damage_from: [],
              double_damage_to: [],
              half_damage_from: [],
              half_damage_to: [],
              no_damage_from: [],
              no_damage_to: [],
            },
          ];
          res.data.types.map((key) => {
            axios.get(key.type.url).then((res) => {
              let dmg_relation = res.data.damage_relations;
              //double damage to
              dmg_relation.double_damage_from.map((key) => {
                temp_dmg[0].double_damage_from.push(key.name);
              });
              //double damage to
              dmg_relation.double_damage_to.map((key) => {
                temp_dmg[0].double_damage_to.push(key.name);

              });
              //half damage from
              dmg_relation.half_damage_from.map((key) => {
                temp_dmg[0].half_damage_from.push(key.name);

              });
              //half damage to
              dmg_relation.half_damage_to.map((key) => {
                temp_dmg[0].half_damage_to.push(key.name);

              });
              //no damage from
              dmg_relation.no_damage_from.map((key) => {
                temp_dmg[0].no_damage_from.push(key.name);

              });
              //no damage to
              dmg_relation.no_damage_to.map((key) => {
                temp_dmg[0].no_damage_to.push(key.name);

              });
            });
          });

          //get and set abilities
          let temp_abilities = [];
          for (let i = 0; i < res.data.abilities.length; i++) {
            if (typeof res.data.abilities[i].ability !== "undefined") {
              axios.get(res.data.abilities[i].ability.url).then((res) => {
                const name = res.data.name;
                const en_desc = res.data.effect_entries.filter(
                  (key) => key.language.name === "en"
                );
                temp_abilities.push({ name: name, desc: en_desc });
              });
            }
          }

          //setState for pokemon Data
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
              height: res.data.height,
              weight: res.data.weight,
              abilities: temp_abilities,
              dmg_relation: temp_dmg,
            })
          );
        });
    }
  }, [selectedPokemon, pokemonData.selected_move]);


  return (
    <React.Fragment>
      <div className="team-analyst-container">
        <PokemonTeamList
          pokemonData={pokemonData}
          setPickedPokemon={setPickedPokemon}
          setPokemonData={setPokemonData}
        ></PokemonTeamList>
        <PokemonStat
          pokemonData={pokemonData}
          picked_pokemon={picked_pokemon}
        ></PokemonStat>
      </div>
    </React.Fragment>
  );
};

export default TeamAnalysis;
