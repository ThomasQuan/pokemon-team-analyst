import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import axios from "axios";

const PokemonStat = (props) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pickedPokemon, setPickedPokemon] = useState({
    base_stat: [],
    name: "",
    id: "",
  });

  const [barChart, setBarChart] = useState({
    type: "horizontalBar",
    labels: ["HP", "Attack", "Defense", "Sp.Atk", "Sp.Def", "Speed"],
    datasets: [
      {
        backgroundColor: [
          "#7a1701",
          "#ffee03",
          "#e3e2d3",
          "#eb3657",
          "#85d2f2",
          "#fccc65",
        ],
        borderColor: "rgba(255,99,132,1)",
        barThickness: 10,
        hoverBorderColor: "#8c0c00",
        data: [],
      },
    ],
  });

  const BarOption = {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "POKEMON STAT",
    },
  };

  useEffect(() => {
    if (typeof props.picked_pokemon.picked_pokemon !== "undefined") {
      setPokemonData({ pokemonData: props.pokemonData });
      setPickedPokemon({
        base_stat: props.picked_pokemon.picked_pokemon.base_stat,
        name: props.picked_pokemon.picked_pokemon.name,
        id: props.picked_pokemon.picked_pokemon.id,
        dmg_relation: props.picked_pokemon.picked_pokemon.dmg_relation,
      });
    }
  }, [props.picked_pokemon, props.pokemonData]);

  return (
    <React.Fragment>
      {typeof pickedPokemon === "undefined" ? (
        <div className="pokemon-stat-container"></div>
      ) : (
        <div className="pokemon-stat-container">
          <p className="modal-title">{pickedPokemon.name}</p>
          <div className="chart-container">
            <HorizontalBar data={barChart} options={BarOption} />
            <div className="type-container">
              <div className="effect-container">
                <h2>Double Damage From</h2>
                <ul className="effective-list-container">
                  {typeof pickedPokemon.dmg_relation !== "undefined" ? (
                    pickedPokemon.dmg_relation[0].double_damage_from.map(
                      (key) => <li key={key}>{key}</li>
                    )
                  ) : (
                    <li>SELECT YOUR POKEMON</li>
                  )}
                </ul>
              </div>
              <div className="effect-container">
                <h2>Double Damage To</h2>
                <ul className="effective-list-container">
                  {typeof pickedPokemon.dmg_relation !== "undefined" ? (
                    pickedPokemon.dmg_relation[0].double_damage_to.map(
                      (key) => <li key={key}>{key}</li>
                    )
                  ) : (
                    <li>SELECT YOUR POKEMON</li>
                  )}
                </ul>
              </div>
              <div className="effect-container">
                <h2>Half Damage From</h2>
                <ul className="effective-list-container">
                  {typeof pickedPokemon.dmg_relation !== "undefined" ? (
                    pickedPokemon.dmg_relation[0].half_damage_from.map(
                      (key) => <li key={key}>{key}</li>
                    )
                  ) : (
                    <li>SELECT YOUR POKEMON</li>
                  )}
                </ul>
              </div>
              <div className="effect-container">
                <h2>Half Damage to</h2>
                <ul className="effective-list-container">
                  {typeof pickedPokemon.dmg_relation !== "undefined" ? (
                    pickedPokemon.dmg_relation[0].half_damage_to.map(
                      (key) => <li key={key}>{key}</li>
                    )
                  ) : (
                    <li>SELECT YOUR POKEMON</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default PokemonStat;
