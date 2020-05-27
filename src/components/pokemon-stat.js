import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import axios from "axios";

const PokemonStat = (props) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pickedPokemon, setPickedPokemon] = useState({
    base_stat: [],
    name: "",
    damage_relation: [],
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
    const fetchData = async () => {
      if (typeof props.picked_pokemon.picked_pokemon !== "undefined") {
        let temp = [];
        await props.picked_pokemon.picked_pokemon.types.map((key) => {
          axios.get(key.type.url).then((res) => {
            temp.push(res.data.damage_relations);
          });
        });
        await setPokemonData({ pokemonData: props.pokemonData });
        await setPickedPokemon({
          base_stat: props.picked_pokemon.picked_pokemon.base_stat,
          name: props.picked_pokemon.picked_pokemon.name,
          id: props.picked_pokemon.picked_pokemon.id,
          damage_relation: temp,
        });
      }
    };
    fetchData();
  }, [props.picked_pokemon]);

  return (
    <React.Fragment>
      {typeof pickedPokemon === "undefined" ? (
        <div className="pokemon-stat-container"></div>
      ) : (
        <div className="pokemon-stat-container">
          <p className="modal-title">
            {pickedPokemon.name}
            {console.log(pickedPokemon)}
          </p>
          <div className="chart-container">
            <HorizontalBar data={barChart} options={BarOption} />
            <div className="type-container">
              <div className="effect-container">
                <h2>Supper effective agaisnt</h2>
                <ul className="effective-list-container">
                  <li>Fire</li>
                </ul>
              </div>
              <div className="effect-container">
                <h2>Double Damage To</h2>
                <ul className="effective-list-container">
                  <li>FIRE</li>
                </ul>
              </div>
              <div className="effect-container">
                <h2>half effective agaisnt</h2>
                <ul className="effective-list-container">
                  <li>FIRE</li>
                </ul>
              </div>
              <div className="effect-container">
                <h2>No effect agaisnt</h2>
                <ul className="effective-list-container">
                  <li>FIRE</li>
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
