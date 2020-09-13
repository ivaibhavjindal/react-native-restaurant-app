import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { Input, CheckBox, Button, Icon } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { baseUrl } from "../shared/baseUrl";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      remember: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      let userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState({
          username: userinfo.username,
          password: userinfo.password,
          remember: true,
        });
      }
    });
  }

  handleLogin() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((err) => console.log("Could not save user info", err));
    } else {
      SecureStore.deleteItemAsync("userinfo").catch((err) =>
        console.log("Could not delete user info", err)
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          inputContainerStyle={styles.formInput}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "key" }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          inputContainerStyle={styles.formInput}
        />
        <CheckBox
          title="Remember Me"
          center
          onPress={() => this.setState({ remember: !this.state.remember })}
          checked={this.state.remember}
          inputContainerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={this.handleLogin}
            icon={
              <Icon
                name="sign-in"
                type="font-awesome"
                size={24}
                color="white"
              />
            }
            title="Login"
            color="#512DA8"
            buttonStyle={{ backgroundColor: "#512DA8" }}
          />
        </View>
        <View style={styles.formButton}>
          <Button
            clear
            onPress={() => this.props.navigation.navigate("Register")}
            icon={
              <Icon
                name="user-plus"
                type="font-awesome"
                size={24}
                color="blue"
              />
            }
            title="Register"
            color="#512DA8"
            buttonStyle={{ backgroundColor: "none" }}
            titleStyle={{ color: "blue" }}
          />
        </View>
      </View>
    );
  }
}

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
      remember: false,
      imageUrl: `${baseUrl}images/logo.png`,
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember)
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Input
            placeholder="Username"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            inputContainerStyle={styles.formInput}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: "font-awesome", name: "key" }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            inputContainerStyle={styles.formInput}
          />
          <Input
            placeholder="First Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(firstname) => this.setState({ firstname })}
            value={this.state.firstname}
            inputContainerStyle={styles.formInput}
          />
          <Input
            placeholder="Last Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(lastname) => this.setState({ lastname })}
            value={this.state.lastname}
            inputContainerStyle={styles.formInput}
          />
          <Input
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "envelope-o" }}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            inputContainerStyle={styles.formInput}
          />
          <CheckBox
            title="Remember Me"
            center
            onPress={() => this.setState({ remember: !this.state.remember })}
            checked={this.state.remember}
            inputContainerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
            <Button
              onPress={this.handleRegister}
              icon={
                <Icon
                  name="user-plus"
                  type="font-awesome"
                  size={24}
                  color="white"
                />
              }
              title="Register"
              color="#512DA8"
              buttonStyle={{ backgroundColor: "#512DA8" }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 20,
  },
  formInput: {
    margin: 5,
  },
  formCheckbox: {
    margin: 40,
  },
  formButton: {
    margin: 10,
  },
});
