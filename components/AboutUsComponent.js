import React from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text, FlatList } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    leaders: state.leaders,
  };
};

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
      leftAvatar={{ source: { uri: baseUrl + item.image } }}
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

function AboutUs({ leaders }) {
  return (
    <ScrollView>
      <History />
      <CorporateLeadership leaders={leaders.leaders} />
    </ScrollView>
  );
}

export default connect(mapStateToProps)(AboutUs);
