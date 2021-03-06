import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from "moment";
import { Notifications } from "expo";
import * as Animatable from "react-native-animatable";
import * as Permissions from "expo-permissions";

class ReservationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      smoking: false,
      date: new Date(),
      show: false,
      mode: "date",
    };
    this.handleReservation = this.handleReservation.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    const { guests, smoking, date } = this.state;
    const userResponse = ` Number of Guests: ${guests}\n Smoking?: ${
      smoking ? "Yes" : "No"
    }\n Date and Time: ${date}`;
    Alert.alert(
      "Confirm Reservation",
      userResponse,
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
            this.resetForm();
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            this.presentLocalNotification(this.state.date);
            this.resetForm();
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: new Date(),
      show: false,
      mode: "date",
    });
  }

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission not granted to show notifications");
      }
    }
    return permission;
  }

  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.createChannelAndroidAsync("confusion", {
      name: "confusion",
      sound: true,
      vibrate: true,
    });
    Notifications.presentLocalNotificationAsync({
      title: "Your Reservation",
      body: `Reservation for ${date} requested`,
      ios: {
        sound: true,
      },
      android: {
        color: "#512DA8",
      },
    });
  }

  render() {
    const pickerValues = ["1", "2", "3", "4", "5", "6"];
    return (
      <ScrollView>
        <Animatable.View animation="zoomIn" duration={2000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ guests: itemValue })
              }
            >
              {pickerValues.map((value) => (
                <Picker.Item key={value} label={value} value={value} />
              ))}
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking ?</Text>
            <Switch
              style={(styles.formItem, { marginLeft: 4 })}
              value={this.state.smoking}
              trackColor={{ true: "#512DA8" }}
              onValueChange={(value) => this.setState({ smoking: value })}
            />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <TouchableOpacity
              style={styles.formItem}
              style={{
                padding: 7,
                borderColor: "#512DA8",
                borderWidth: 2,
                flexDirection: "row",
              }}
              onPress={() => this.setState({ show: true, mode: "date" })}
            >
              <Icon type="font-awesome" name="calendar" color="#512DA8" />
              <Text>
                {" " + Moment(this.state.date).format("DD-MMM-YYYY h:mm A")}
              </Text>
            </TouchableOpacity>
            {this.state.show && (
              <DateTimePicker
                value={this.state.date}
                mode={this.state.mode}
                minimumDate={new Date()}
                minuteInterval={30}
                onChange={(event, date) => {
                  if (date === undefined) {
                    this.setState({ show: false });
                  } else {
                    this.setState({
                      show: this.state.mode === "time" ? false : true,
                      mode: "time",
                      date: new Date(date),
                    });
                  }
                }}
              />
            )}
          </View>
          <View style={styles.formRow}>
            <Button
              title="Reserve"
              color="#512DA8"
              onPress={this.handleReservation}
              accessibilityLabel="Learn more about this purple button"
            />
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  datePicker: {
    flex: 2,
    marginRight: 20,
  },
});

export default ReservationForm;
