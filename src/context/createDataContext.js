import React, { useReducer } from "react";

//This is a reusable function that automates setting up new objects
export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //Deal with actions = actions === {ADD_POST:(dispatch) => function}
    //Loop through actions object
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  //Return our new context and provider objects
  return { Context, Provider };
};
