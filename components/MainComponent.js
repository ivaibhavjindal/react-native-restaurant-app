import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  Platform,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./MenuComponent";
import Home from "./HomeComponent";
import ContactUs from "./ContactUsComponent";
import AboutUs from "./AboutUsComponent";
import DishDetail from "./DishDetailComponent";
import Reservation from "./ReservationComponent";
import Favorites from "./FavoriteComponent";
import Login from "./LoginComponent";
import {
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
} from "../redux/ActionCreators";
import { baseUrl } from "../shared/baseUrl";

const logoImageUrl = baseUrl + "images/logo.png";

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const MenuStack = createStackNavigator();
const HomeStack = createStackNavigator();
const ContactUsStack = createStackNavigator();
const AboutUsStack = createStackNavigator();
const ReservationStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const LoginStack = createStackNavigator();
const MainDrawer = createDrawerNavigator();

const MenuNavigator = () => (
  <MenuStack.Navigator
    initialRouteName="Menu"
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: ({ tintColor }) => (
        <Icon
          name="menu"
          iconStyle={{ marginLeft: 10 }}
          size={24}
          color={tintColor}
          onPress={navigation.toggleDrawer}
        />
      ),
    })}
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
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: ({ tintColor }) => (
        <Icon
          name="menu"
          iconStyle={{ marginLeft: 10 }}
          size={24}
          color={tintColor}
          onPress={navigation.toggleDrawer}
        />
      ),
    })}
  >
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{ title: "Home" }}
    />
  </HomeStack.Navigator>
);

const ContactUsNavigator = () => (
  <ContactUsStack.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: ({ tintColor }) => (
        <Icon
          name="menu"
          iconStyle={{ marginLeft: 10 }}
          size={24}
          color={tintColor}
          onPress={navigation.toggleDrawer}
        />
      ),
    })}
  >
    <ContactUsStack.Screen
      name="ContactUs"
      component={ContactUs}
      options={{ title: "Contact Us" }}
    />
  </ContactUsStack.Navigator>
);

const AboutUsNavigator = () => (
  <AboutUsStack.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: ({ tintColor }) => (
        <Icon
          name="menu"
          iconStyle={{ marginLeft: 10 }}
          size={24}
          color={tintColor}
          onPress={navigation.toggleDrawer}
        />
      ),
    })}
  >
    <AboutUsStack.Screen
      name="AboutUs"
      component={AboutUs}
      options={{ title: "About Us" }}
    />
  </AboutUsStack.Navigator>
);

const ReservationNavigator = () => (
  <ReservationStack.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: ({ tintColor }) => (
        <Icon
          name="menu"
          iconStyle={{ marginLeft: 10 }}
          size={24}
          color={tintColor}
          onPress={navigation.toggleDrawer}
        />
      ),
    })}
  >
    <ReservationStack.Screen
      name="Reservation"
      component={Reservation}
      options={{ title: "Reserve Table" }}
    />
  </ReservationStack.Navigator>
);

const FavoritesNavigator = () => (
  <FavoritesStack.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: ({ tintColor }) => (
        <Icon
          name="menu"
          iconStyle={{ marginLeft: 10 }}
          size={24}
          color={tintColor}
          onPress={navigation.toggleDrawer}
        />
      ),
    })}
  >
    <FavoritesStack.Screen
      name="Favorites"
      component={Favorites}
      options={{ title: "My Favorites" }}
    />
    <FavoritesStack.Screen
      name="DishDetail"
      component={DishDetail}
      options={{ title: "Dish Detail" }}
    />
  </FavoritesStack.Navigator>
);

const LoginNavigator = () => (
  <LoginStack.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerLeft: ({ tintColor }) => (
        <Icon
          name="menu"
          iconStyle={{ marginLeft: 10 }}
          size={24}
          color={tintColor}
          onPress={navigation.toggleDrawer}
        />
      ),
    })}
  >
    <LoginStack.Screen
      name="Login"
      component={Login}
      options={{ title: "Login" }}
    />
  </LoginStack.Navigator>
);

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image source={{ uri: logoImageUrl }} style={styles.drawerImage} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);

const MainNavigator = () => {
  return (
    <MainDrawer.Navigator
      initialRouteName={"Home"}
      drawerContent={CustomDrawerContentComponent}
      drawerStyle={{ backgroundColor: "#D1C4E9" }}
    >
      <MainDrawer.Screen
        name="Login"
        component={LoginNavigator}
        options={{
          title: "Login",
          drawerLabel: "Login",
          drawerIcon: ({ color }) => (
            <Icon name="sign-in" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <MainDrawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          title: "Home",
          drawerLabel: "Home",
          drawerIcon: ({ color }) => (
            <Icon name="home" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <MainDrawer.Screen
        name="AboutUs"
        component={AboutUsNavigator}
        options={{
          title: "AboutUs",
          drawerLabel: "About Us",
          drawerIcon: ({ color }) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <MainDrawer.Screen
        name="Menu"
        component={MenuNavigator}
        options={{
          title: "Menu",
          drawerLabel: "Menu",
          drawerIcon: ({ color }) => (
            <Icon name="list" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <MainDrawer.Screen
        name="ContactUs"
        component={ContactUsNavigator}
        options={{
          title: "ContactUs",
          drawerLabel: "Contact Us",
          drawerIcon: ({ color }) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <MainDrawer.Screen
        name="Favorites"
        component={FavoritesNavigator}
        options={{
          title: "My Favorites",
          drawerLabel: "My Favorites",
          drawerIcon: ({ color }) => (
            <Icon name="heart" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
      <MainDrawer.Screen
        name="Reservation"
        component={ReservationNavigator}
        options={{
          title: "Reserve Table",
          drawerLabel: "Reserve Table",
          drawerIcon: ({ color }) => (
            <Icon name="cutlery" type="font-awesome" size={24} color={color} />
          ),
        }}
      />
    </MainDrawer.Navigator>
  );
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    height: 140,
    backgroundColor: "#512DA8",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60,
  },
});

export default connect(null, mapDispatchToProps)(Main);
