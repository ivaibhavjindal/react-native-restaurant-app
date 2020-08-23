import React, { Component } from "react";
import { View, ScrollView, Text, FlatList } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { LEADERS } from "../shared/leaders";

const historyData = [
  "Started in 2010, Ristorante con Fusion quickly established itself as aculinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong. Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.",
  "The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.",
];

const History = () => (
  <Card title={"Our History"}>
    {historyData.map((data, index) => (
      <Text style={{ margin: 10 }} key={index}>
        {data}
      </Text>
    ))}
  </Card>
);

const renderLeader = ({ item, index }) => {
  return (
    <ListItem
      key={index}
      title={item.name}
      subtitle={item.description}
      hideChevron={true}
      leftAvatar={{ source: require("./images/alberto.png") }}
    />
  );
};

const CorporateLeadership = ({ leaders }) => {
  if (leaders != null) {
    return (
      <Card title={"Corporate Leadership"}>
        <FlatList
          data={leaders}
          renderItem={renderLeader}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    );
  }
  return <View />;
};

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaders: LEADERS,
    };
  }
  render() {
    return (
      <ScrollView>
        <History />
        <CorporateLeadership leaders={this.state.leaders} />
      </ScrollView>
    );
  }
}

export default ContactUs;
