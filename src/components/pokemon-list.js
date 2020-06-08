import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Alert from "./utils/alert-modal";
import { Link } from "react-router-dom";
import MasterBall from "../assets/images/master_ball.png";
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
      .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")
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
    this.setState({ openAlert: false });
  };

  deselect_pokemon = (pokemonName) => {
    const newArray = [];
    this.state.selected_team.map((key) => {
      if (key.name !== pokemonName) {
        newArray.push(key);
      }
      else{
        let tempArr = this.state.pokemons;
        tempArr.splice(key.id-1, 0, key);
        this.setState({pokemons : tempArr})
      }
    });
    this.setState({
      selected_team: newArray,
    });
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
      this.setState({ openAlert: true });
    }
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
        <div className="pokemon-list-container">
          {this.state.selected_team.length !== 0 ? (
            <div className="selected-container">
              <h2 className="title">Selected Team</h2>
              <Alert
                isOpen={this.state.openAlert}
                handleClose={this.handleClose}
              ></Alert>
              <div className="selected-pokemon-list">
                {this.state.selected_team.map((key) => (
                  <div
                    className="selected-pokemon"
                    key={key.name}
                    onClick={() => {
                      this.deselect_pokemon(key.name);
                    }}
                  >
                    <img
                      className="pokemon-img"
                      src={`https://pokeres.bastionbot.org/images/pokemon/${key.id}.png`}
                      alt="pokemon"
                    ></img>
                    <h3>{key.name}</h3>
                  </div>
                ))}
              </div>
              {this.state.selected_team.length !== 0 && (
                <Link
                  id="btn-inspect"
                  to={{
                    pathname: "/team",
                    pokemons: { selected: this.state.selected_team },
                  }}
                >
                  <Button>Inspect</Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="selected-container">
              <h2 className="title">Selected Team</h2>
              <Alert
                isOpen={this.state.openAlert}
                handleClose={this.handleClose}
              ></Alert>
              <div className="selected-pokemon-list">
                <div className="selected-pokemon">
                  <img
                    className="pokemon-img"
                    src={MasterBall}
                    alt="pokemon"
                  ></img>
                  <h3>SELECT YOUR POKEMON</h3>
                </div>
              </div>
              <Link id="btn-inspect" to="/">
                <Button disabled>Inspect</Button>
              </Link>
            </div>
          )}
          <div className="search-container">
            <input />
          </div>

          <div className="container-list">
            <h2 className="title">POKEMONS</h2>
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
          </div>
          <div className='load-more-container'>
            <Button id="load-more" onClick={() => this.loadNextBatch()}>
              LOAD MORE
            </Button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PokemonList;
