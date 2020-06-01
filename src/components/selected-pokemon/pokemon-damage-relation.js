import React from "react";
import TypeDetector from "../utils/types-detector";
import { v4 as uuidv4 } from "uuid";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const Damage_Relation = (props) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <React.Fragment>
      <Tabs>
        <TabList className='tab-header'>
          <Tab>Attack Relation</Tab>
          <Tab>Defense Relation</Tab>
        </TabList>

        <TabPanel>
          <div className="type-container">
            <div className="effect-container">
              <h2>Double Damage To</h2>
              <ul className="effective-list-container">
                {typeof props.pickedPokemon.dmg_relation !== "undefined" ? (
                  props.pickedPokemon.dmg_relation[0].double_damage_to.map(
                    (key) => (
                      <li
                        style={{ background: TypeDetector(key) }}
                        key={uuidv4()}
                      >
                        {key}
                      </li>
                    )
                  )
                ) : (
                  <li>SELECT YOUR POKEMON</li>
                )}
              </ul>
            </div>

            <div className="effect-container">
              <h2>Half Damage to</h2>
              <ul className="effective-list-container">
                {typeof props.pickedPokemon.dmg_relation !== "undefined" ? (
                  props.pickedPokemon.dmg_relation[0].half_damage_to.map(
                    (key) => (
                      <li
                        style={{ background: TypeDetector(key) }}
                        key={uuidv4()}
                      >
                        {key}
                      </li>
                    )
                  )
                ) : (
                  <li>SELECT YOUR POKEMON</li>
                )}
              </ul>
            </div>
            <div className="effect-container">
              <h2>No Damage to</h2>
              <ul className="effective-list-container">
                {typeof props.pickedPokemon.dmg_relation !== "undefined" ? (
                  props.pickedPokemon.dmg_relation[0].no_damage_to.map(
                    (key) => (
                      <li
                        style={{ background: TypeDetector(key) }}
                        key={uuidv4()}
                      >
                        {key}
                      </li>
                    )
                  )
                ) : (
                  <li>SELECT YOUR POKEMON</li>
                )}
              </ul>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
        <div className="type-container">
            <div className="effect-container">
              <h2>Double Damage From</h2>
              <ul className="effective-list-container">
                {typeof props.pickedPokemon.dmg_relation !== "undefined" ? (
                  props.pickedPokemon.dmg_relation[0].double_damage_from.map(
                    (key) => (
                      <li
                        style={{ background: TypeDetector(key) }}
                        key={uuidv4()}
                      >
                        {key}
                      </li>
                    )
                  )
                ) : (
                  <li>SELECT YOUR POKEMON</li>
                )}
              </ul>
            </div>

            <div className="effect-container">
              <h2>Half Damage From</h2>
              <ul className="effective-list-container">
                {typeof props.pickedPokemon.dmg_relation !== "undefined" ? (
                  props.pickedPokemon.dmg_relation[0].half_damage_from.map(
                    (key) => (
                      <li
                        style={{ background: TypeDetector(key) }}
                        key={uuidv4()}
                      >
                        {key}
                      </li>
                    )
                  )
                ) : (
                  <li>SELECT YOUR POKEMON</li>
                )}
              </ul>
            </div>
            <div className="effect-container">
              <h2>No Damage from</h2>
              <ul className="effective-list-container">
                {typeof props.pickedPokemon.dmg_relation !== "undefined" ? (
                  props.pickedPokemon.dmg_relation[0].no_damage_from.map(
                    (key) => (
                      <li
                        style={{ background: TypeDetector(key) }}
                        key={uuidv4()}
                      >
                        {key}
                      </li>
                    )
                  )
                ) : (
                  <li>SELECT YOUR POKEMON</li>
                )}
              </ul>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </React.Fragment>
  );
};

export default Damage_Relation;
