import React, { Component } from "react";
import { View, Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import DishDetail from "./DishDetailComponent";

const MenuStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MainDrawer = createDrawerNavigator();

const MenuNavigator = () => (
  <MenuStack.Navigator
    initialRouteName="Menu"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    }}
  >
    <MenuStack.Screen
      name="Menu"
      component={Menu}
      options={{ title: "Menu" }}
    />
    <MenuStack.Screen
      name="DishDetail"
      component={DishDetail}
      options={{ title: "Dish Detail" }}
    />
  </MenuStack.Navigator>
);

const HomeNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{ title: "Home" }}
    />
  </HomeStack.Navigator>
);

const MainNavigator = () => {
  return (
    <MainDrawer.Navigator drawerStyle={{ backgroundColor: "#D1C4E9" }}>
      <MainDrawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{ title: "Home", drawerLabel: "Home" }}
      />
      <MainDrawer.Screen
        name="Menu"
        component={MenuNavigator}
        options={{ title: "Menu", drawerLabel: "Menu" }}
      />
    </MainDrawer.Navigator>
  );
};

class Main extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop:
            Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
        }}
      >
        <MainNavigator />
      </View>
    );
  }
}

export default Main;
