import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList, View, Text } from "react-native";
import { Tile } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
  };
};
class Menu extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const dishes = this.props.dishes;
    const renderMenuItem = ({ item, index }) => {
      return (
        <Animatable.View animation="fadeInRightBig" duration={2000}>
          <Tile
            key={index}
            title={item.name}
            featured
            caption={item.description}
            onPress={() => navigate("DishDetail", { dishId: item.id })}
            imageSrc={{ uri: baseUrl + item.image }}
          />
        </Animatable.View>
      );
    };

    if (dishes.loading) return <Loading />;
    else if (dishes.errMess)
      return (
        <View>
          <Text>{dishes.errMess}</Text>
        </View>
      );
    else {
      return (
        <FlatList
          data={dishes.dishes}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id.toString()}
        />
      );
    }
  }
}

export default connect(mapStateToProps)(Menu);
