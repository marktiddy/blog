import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IndexScreen from "./src/screens/indexScreen";
import ShowScreen from "./src/screens/ShowScreen";
import CreateScreen from "./src/screens/CreateScreen";
import { Provider } from "./src/context/BlogContext";

const navigator = createStackNavigator(
  {
    Index: { screen: IndexScreen },
    Show: ShowScreen,
    Create: CreateScreen,
  },
  {
    initialRouterName: "Index",
    defaultNavigationOptions: {
      title: "Blogs",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  //we create a blog provider component and pass app in as a child
  return (
    <Provider>
      <App />
    </Provider>
  );
};
