import React from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text } from "react-native";
import { Card } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const RenderItem = ({ item, isLoading, errMess }) => {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return (
      <View>
        <Text>{errMess}</Text>
      </View>
    );
  } else {
    if (item !== null) {
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
  }
};

function Home({ dishes, promotions, leaders }) {
  return (
    <ScrollView>
      <RenderItem
        isLoading={dishes.isLoading}
        errMess={dishes.errMess}
        item={dishes.dishes.filter((dish) => dish.featured)[0]}
      />
      <RenderItem
        isLoading={promotions.isLoading}
        errMess={promotions.errMess}
        item={
          promotions.promotions.filter((promotion) => promotion.featured)[0]
        }
      />
      <RenderItem
        isLoading={leaders.isLoading}
        errMess={leaders.errMess}
        item={leaders.leaders.filter((leader) => leader.featured)[0]}
      />
    </ScrollView>
  );
}

export default connect(mapStateToProps)(Home);
