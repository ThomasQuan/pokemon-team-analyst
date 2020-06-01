import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import DamageRelation from "./pokemon-damage-relation";

const PokemonStat = (props) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pickedPokemon, setPickedPokemon] = useState({
    base_stat: [],
    name: "",
    id: "",
  });



  const [barChart, setBarChart] = useState({
    property: {
      type: "horizontalBar",
      labels: ["", "Speed", "Sp.Def", "Sp.Atk", "Defense", "Attack", "HP"],
      datasets: [
        {
          backgroundColor: "#85d2f2",
          borderColor: "rgba(255,99,132,1)",
          barThickness: 12,
          hoverBorderColor: "#8c0c00",
          //set the first index as 0 so the min is zero and max is 100
          data: [0, 0, 0, 0, 0, 0, 0],
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "POKEMON STAT",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
            },
          },
        ],
      },
    },
  });

  useEffect(() => {
    if (typeof props.picked_pokemon.picked_pokemon !== "undefined") {
      setPokemonData({ pokemonData: props.pokemonData });
      setPickedPokemon({
        base_stat: props.picked_pokemon.picked_pokemon.base_stat,
        name: props.picked_pokemon.picked_pokemon.name,
        id: props.picked_pokemon.picked_pokemon.id,
        dmg_relation: props.picked_pokemon.picked_pokemon.dmg_relation,
      });

      let base_stat = props.picked_pokemon.picked_pokemon.base_stat;
      setBarChart({
        property: {
          type: "horizontalBar",
          labels: ["", "Speed", "Sp.Def", "Sp.Atk", "Defense", "Attack", "HP"],
          datasets: [
            {
              backgroundColor: "#85d2f2",
              borderColor: "rgba(255,99,132,1)",
              barThickness: 12,
              hoverBorderColor: "#8c0c00",
              data: [
                0,
                base_stat[0].base_stat,
                base_stat[1].base_stat,
                base_stat[2].base_stat,
                base_stat[3].base_stat,
                base_stat[4].base_stat,
                base_stat[5].base_stat,
              ],
            },
          ],
        },
      });
      console.log(barChart);
    }
  }, [props.picked_pokemon, props.pokemonData, setBarChart]);

  return (
    <React.Fragment>
      {typeof pickedPokemon === "undefined" ? (
        <div className="pokemon-stat-container"></div>
      ) : (
        <div className="pokemon-stat-container">
          <p className="modal-title">{pickedPokemon.name}</p>
          <div className="chart-container">
            <HorizontalBar
              data={barChart.property}
              options={barChart.options}
            />

            <DamageRelation pickedPokemon={pickedPokemon}></DamageRelation>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default PokemonStat;
