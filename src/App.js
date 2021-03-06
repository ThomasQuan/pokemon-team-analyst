import React from "react";
import "./App.scss";
import PokemonList from "./components/pokemon-list/pokemon-list";
import TeamAnalysis from "./components/selected-pokemon/team-analysis";
import NotFound from "./components/errors/not-found";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={PokemonList}></Route>
          <Route path="/main" exact component={PokemonList}></Route>
          <Route path="/team" exact component={TeamAnalysis}></Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
