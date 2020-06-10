import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import DamageRelation from "./pokemon-damage-relation";
import DamageClassDetector from "../utils/damage_class_detector";
import axios from "axios";
import Next from "../../assets/images/next.png";
const PokemonStat = (props) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [pickedPokemon, setPickedPokemon] = useState({});
  const [move1, setMove1] = useState({});
  const [move2, setMove2] = useState({});
  const [move3, setMove3] = useState({});
  const [move4, setMove4] = useState({});
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
    const pp = props.picked_pokemon.picked_pokemon;

    if (typeof pp !== "undefined") {
      setPokemonData({ pokemonData: props.pokemonData });
      setPickedPokemon({
        base_stat: pp.base_stat,
        name: pp.name,
        id: pp.id,
        dmg_relation: pp.dmg_relation,
        weight: pp.weight,
        height: pp.height,
        abilities: pp.abilities,
      });

      setMove1({});
      setMove2({});
      setMove3({});
      setMove4({});
      if (typeof pp.selected_move[0] !== "undefined") {
        axios.get(pp.selected_move[0].move.url).then((res) => {
          let data = res.data;
          setMove1({
            id: data.id,
            accuracy: data.accuracy,
            damage_class: data.damage_class.name,
            effect_chance: data.effect_chance,
            effect_entries: data.effect_entries[0].effect,
            name: data.name,
            power: data.power,
            pp: data.pp,
            priority: data.priority,
            target: data.target.name,
            type: data.type.name,
          });
        });
      }
      if (typeof pp.selected_move[1] !== "undefined") {
        axios.get(pp.selected_move[1].move.url).then((res) => {
          let data = res.data;
          setMove2({
            id: data.id,
            accuracy: data.accuracy,
            damage_class: data.damage_class.name,
            effect_chance: data.effect_chance,
            effect_entries: data.effect_entries[0].effect,
            name: data.name,
            power: data.power,
            pp: data.pp,
            priority: data.priority,
            target: data.target.name,
            type: data.type.name,
          });
        });
      }
      if (typeof pp.selected_move[2] !== "undefined") {
        axios.get(pp.selected_move[2].move.url).then((res) => {
          let data = res.data;
          setMove3({
            id: data.id,
            accuracy: data.accuracy,
            damage_class: data.damage_class.name,
            effect_chance: data.effect_chance,
            effect_entries: data.effect_entries[0].effect,
            name: data.name,
            power: data.power,
            pp: data.pp,
            priority: data.priority,
            target: data.target.name,
            type: data.type.name,
          });
        });
      }
      if (typeof pp.selected_move[3] !== "undefined") {
        axios.get(pp.selected_move[3].move.url).then((res) => {
          let data = res.data;
          setMove4({
            id: data.id,
            accuracy: data.accuracy,
            damage_class: data.damage_class.name,
            effect_chance: data.effect_chance,
            effect_entries: data.effect_entries[0].effect,
            name: data.name,
            power: data.power,
            pp: data.pp,
            priority: data.priority,
            target: data.target.name,
            type: data.type.name,
          });
        });
      }

      let base_stat = pp.base_stat;
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
    }
  }, [props.picked_pokemon, props.pokemonData, setBarChart]);

  return (
    <React.Fragment>
      <div className="pokemon-stat-container">
        {
          (pickedPokemon.name === "" ? (
            <p className="modal-title">SELECT YOUR POKEMON</p>
          ) : (
            <p className="modal-title">{pickedPokemon.name}</p>
          ))
        }

        <div className="information-container">
          <div className="chart-container">
            <HorizontalBar
              data={barChart.property}
              options={barChart.options}
            />

            <DamageRelation pickedPokemon={pickedPokemon}></DamageRelation>
          </div>
          <div className="pokemon-info">
            <div className="pokemon-body-portion">
              <h3>Height : {pickedPokemon.height} cm</h3>
              <h3>Weight : {pickedPokemon.weight} kg</h3>
            </div>
            <h3>Abilities</h3>
            {typeof pickedPokemon.abilities !== "undefined" ? (
              <ul>
                {pickedPokemon.abilities.map((key, index) => (
                  <li key={index}>{key.desc[0].effect}</li>
                ))}
              </ul>
            ) : (
              <ul></ul>
            )}

            <h3>Selected Move attribute</h3>
            <div>
              {typeof move1 !== "undefined" ? (
                <div className="move-detail-container">
                  <div className="move-detail-container-title">
                    <h3>{move1.name}</h3>
                    <img
                      alt="damage-class"
                      src={DamageClassDetector(move1.damage_class)}
                    ></img>
                  </div>
                  <ul>
                    <li>Accuracy : {move1.accuracy}</li>
                    <li>Damage Class : {move1.damage_class}</li>
                    <li>Effeect Chance : {move1.effect_chance}</li>
                    <li>Power : {move1.power}</li>
                    <li>PP : {move1.pp}</li>
                    <li>Priority : {move1.priority}</li>
                    <li>Target : {move1.target}</li>
                    <li>Type : {move1.type}</li>
                  </ul>
                </div>
              ) : (
                <div></div>
              )}
              {typeof move2 !== "undefined" ? (
                <div className="move-detail-container">
                  <div className="move-detail-container-title">
                    <h3>{move2.name}</h3>
                    <img
                      alt="damage-class"
                      src={DamageClassDetector(move2.damage_class)}
                    ></img>
                  </div>
                  <ul>
                    <li>Accuracy : {move2.accuracy}</li>
                    <li>Damage Class : {move2.damage_class}</li>
                    <li>Effeect Chance : {move2.effect_chance}</li>
                    <li>Power : {move2.power}</li>
                    <li>PP : {move2.pp}</li>
                    <li>Priority : {move2.priority}</li>
                    <li>Target : {move2.target}</li>
                    <li>Type : {move2.type}</li>
                  </ul>
                </div>
              ) : (
                <div></div>
              )}
              {typeof move3 !== "undefined" ? (
                <div className="move-detail-container">
                  <div className="move-detail-container-title">
                    <h3>{move3.name}</h3>
                    <img
                      alt="damage-class"
                      src={DamageClassDetector(move3.damage_class)}
                    ></img>
                  </div>
                  <ul>
                    <li>Accuracy : {move3.accuracy}</li>
                    <li>Damage Class : {move3.damage_class}</li>
                    <li>Effeect Chance : {move3.effect_chance}</li>
                    <li>Power : {move3.power}</li>
                    <li>PP : {move3.pp}</li>
                    <li>Priority : {move3.priority}</li>
                    <li>Target : {move3.target}</li>
                    <li>Type : {move3.type}</li>
                  </ul>
                </div>
              ) : (
                <div></div>
              )}
              {typeof move4 !== "undefined" ? (
                <div className="move-detail-container">
                  <div className="move-detail-container-title">
                    <h3>{move4.name}</h3>
                    <img
                      alt="damage-class"
                      src={DamageClassDetector(move4.damage_class)}
                    ></img>
                  </div>
                  <ul>
                    <li>Accuracy : {move4.accuracy}</li>
                    <li>Damage Class : {move4.damage_class}</li>
                    <li>Effeect Chance : {move4.effect_chance}</li>
                    <li>Power : {move4.power}</li>
                    <li>PP : {move4.pp}</li>
                    <li>Priority : {move4.priority}</li>
                    <li>Target : {move4.target}</li>
                    <li>Type : {move4.type}</li>
                  </ul>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PokemonStat;
