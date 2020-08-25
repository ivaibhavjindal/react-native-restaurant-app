import React from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const RenderItem = ({ item }) => {
  if (item != null) {
    return (
      <Card
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={{ uri: baseUrl + item.image }}
      >
        <Text style={{ margin: 10 }}>{item.description}</Text>
      </Card>
    );
  } else {
    return <View />;
  }
};

function Home({ dishes, promotions, leaders }) {
  console.log(dishes, leaders, promotions);
  return (
    <ScrollView>
      <RenderItem item={dishes.dishes.filter((dish) => dish.featured)[0]} />
      <RenderItem
        item={
          promotions.promotions.filter((promotion) => promotion.featured)[0]
        }
      />
      <RenderItem
        item={leaders.leaders.filter((leader) => leader.featured)[0]}
      />
    </ScrollView>
  );
}

export default connect(mapStateToProps)(Home);
