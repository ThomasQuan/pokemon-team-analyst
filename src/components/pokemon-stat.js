import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";

const PokemonStat = (props) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pickedPokemon, setPickedPokemon] = useState();
  const [barChart, setBarChart] = useState({
    barChart: {
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
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    },
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
      setPokemonData({ pokemonData: props.pokemonData });
      setPickedPokemon({ pickedPokemon: props.picked_pokemon });
    };
    fetchData();
  }, [props.picked_pokemon]);

  return (
    <React.Fragment>
      <div className="pokemon-stat-container">
        <p className="modal-title">{props.picked_pokemon.picked_pokemon}</p>
        <HorizontalBar data={barChart.barChart} options={BarOption} />
      </div>
    </React.Fragment>
  );
};

export default PokemonStat;
