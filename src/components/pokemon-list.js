import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Modal from 'react-modal';
import Alert from './alert_modal';
import { Link } from "react-router-dom";

class PokemonList extends Component {
  state = {
    manager: "Thanh Quan",
    selected_team: [],
    pokemons: [],
    next: "",
    openAlert: false,
  };
  componentDidMount() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20")
      .then((res) => {
        const content = res.data.results;
        let tmpArray = [];
        for (var i = 0; i < content.length; i++) {
          tmpArray.push(content[i]);
        }
        this.setState({
          pokemons: tmpArray,
          next: res.data.next,
        });
      });
  }

  handleClose = () => {
    this.setState({openAlert : false});
  };

  selectPokemon = (pokemon, index, id) => {
    if (this.state.selected_team.length < 6) {
      const tempArr = this.state.pokemons;
      tempArr.splice(index, 1);
      this.setState({
        selected_team: [
          ...this.state.selected_team,
          { name: pokemon.name, url: pokemon.url, id: id.replace(/\//g, "") },
        ],
        pokemons: tempArr,
      });
    } else {
        this.setState({openAlert : true})
    }
  };

  inspect_team = () => {
    const team = this.state.selected_team;
    console.log(team);
  };

  loadNextBatch = () => {
    axios.get(`${this.state.next}`).then((res) => {
      const content = res.data.results;
      let tmpArray = [];
      for (var i = 0; i < content.length; i++) {
        tmpArray.push(content[i]);
      }
      this.setState({
        pokemons: this.state.pokemons.concat(tmpArray),
        next: res.data.next,
      });
    });
  };
  render() {
    return (
      <React.Fragment>
        <h2 className="title">Selected Team</h2>
        <Alert isOpen={this.state.openAlert} handleClose={this.handleClose}></Alert>
        <div className="container">
          <div className="selected-pokemon">
            {this.state.selected_team.map((key) => (
              <div key={key.name}>
                <img
                  className="pokemon-img"
                  src={`https://pokeres.bastionbot.org/images/pokemon/${key.id}.png`}
                  alt="pokemon"
                ></img>
                <h3>{key.name}</h3>
              </div>
            ))}
          </div>
          <Link
            id="btn-inspect"
            to={{
              pathname: "/team",
              pokemons: { selected: this.state.selected_team },
            }}
          >
            <Button>Inspect</Button>
          </Link>
        </div>
        <div className="search-box">
          <h2 className="title">Search pokemon</h2>
          <input placeholder="Know what your pokemon name or ID is ?" />
        </div>

        <div className="container">
          <h2 className="title">Pokemon List</h2>
          <div className="pokemon-list">
            {this.state.pokemons.map((key, index) => (
              <div
                className="pokemon"
                onClick={() =>
                  this.selectPokemon(key, index, key.url.substr(33))
                }
                key={key.name}
              >
                <img
                  className="pokemon-img"
                  src={`https://pokeres.bastionbot.org/images/pokemon/${key.url
                    .substr(33)
                    .replace(/\//g, "")}.png`}
                  alt="pokemon "
                  width="150px"
                  height="150px"
                ></img>
                {key.name}
              </div>
            ))}
          </div>

          <Button id="btn-inspect" onClick={() => this.loadNextBatch()}>
            LOAD MORE
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default PokemonList;
