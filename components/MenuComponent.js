import React, { Component } from "react";
import { connect } from "react-redux";
import { FlatList } from "react-native";
import { Tile } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";

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
        <Tile
          key={index}
          title={item.name}
          featured
          caption={item.description}
          onPress={() => navigate("DishDetail", { dishId: item.id })}
          imageSrc={{ uri: baseUrl + item.image }}
        />
      );
    };

    return (
      <FlatList
        data={dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Menu);
