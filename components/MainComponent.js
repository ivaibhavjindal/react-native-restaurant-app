import React, { Component } from "react";
import { View, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";

const Stack = createStackNavigator();

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
        <Stack.Navigator
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
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ title: "Menu" }}
          />
          <Stack.Screen
            name="DishDetail"
            component={DishDetail}
            options={{ title: "Dish Detail" }}
          />
        </Stack.Navigator>
      </View>
    );
  }
}

export default Main;
