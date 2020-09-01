import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, Animated, Easing } from "react-native";
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 8,
      duration: 8000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(this.animate);
  }

  render() {
    const { dishes, promotions, leaders } = this.props;
    const xpos1 = this.animatedValue.interpolate({
      inputRange: [0, 1, 3, 5, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });
    const xpos2 = this.animatedValue.interpolate({
      inputRange: [0, 2, 4, 6, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });
    const xpos3 = this.animatedValue.interpolate({
      inputRange: [0, 3, 5, 7, 8],
      outputRange: [1200, 600, 0, -600, -1200],
    });
    return (
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Animated.View
          style={{ width: "100%", transform: [{ translateX: xpos1 }] }}
        >
          <RenderItem
            isLoading={dishes.isLoading}
            errMess={dishes.errMess}
            item={dishes.dishes.filter((dish) => dish.featured)[0]}
          />
        </Animated.View>
        <Animated.View
          style={{ width: "100%", transform: [{ translateX: xpos2 }] }}
        >
          <RenderItem
            isLoading={promotions.isLoading}
            errMess={promotions.errMess}
            item={
              promotions.promotions.filter((promotion) => promotion.featured)[0]
            }
          />
        </Animated.View>
        <Animated.View
          style={{ width: "100%", transform: [{ translateX: xpos3 }] }}
        >
          <RenderItem
            isLoading={leaders.isLoading}
            errMess={leaders.errMess}
            item={leaders.leaders.filter((leader) => leader.featured)[0]}
          />
        </Animated.View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Home);
