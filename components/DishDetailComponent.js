import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, ScrollView, Modal, Button } from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { postComment, postFavorite } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
});

function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
        <Text style={{ margin: 10 }}>{dish.description}</Text>
        <View
          style={{ justifyContent: "center", flex: 1, flexDirection: "row" }}
        >
          <Icon
            raised
            reverse
            name={props.favorite ? "heart" : "heart-o"}
            type="font-awesome"
            color="#f50"
            onPress={
              props.favorite ? console.log("Already favorite!") : props.onPress
            }
          />
          <Icon
            raised
            reverse
            name="pencil"
            type="font-awesome"
            color="#512DA8"
            onPress={props.openModal}
          />
        </View>
      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = (comment, index) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{comment.comment} start</Text>
        <Rating
          startingValue={comment.rating}
          readonly
          showRating={false}
          imageSize={12}
          style={{
            paddingVertical: 5,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        />
        <Text style={{ fontSize: 12 }}>
          {`-- ${comment.author}, ${new Date(Date.parse(comment.date))}`}
        </Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      {/* Flatlist gives warning when inside ScrollView */}
      {comments.map((comment, i) => renderCommentItem(comment, i))}
    </Card>
  );
}

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      comment: "",
      rating: 3,
      showModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.markFavorite = this.markFavorite.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  openModal() {
    this.setState({ showModal: true });
  }
  closeModal() {
    this.setState({ showModal: false });
  }
  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }
  resetForm() {
    this.setState(
      {
        author: "",
        comment: "",
        rating: 3,
      },
      this.closeModal
    );
  }

  handleSubmit(dishId) {
    console.log(this.props.postComment);
    console.log(this.state);
    this.props.postComment(
      dishId,
      this.state.rating,
      this.state.author,
      this.state.comment
    );
    this.resetForm();
  }
  render() {
    const dishId = this.props.route.params["dishId"];
    return (
      <ScrollView>
        <RenderDish
          // +dishId => string to int
          dish={this.props.dishes.dishes[+dishId]}
          onPress={() => this.markFavorite(dishId)}
          // return true if dishId present in favorites(like filter)
          favorite={this.props.favorites.some((el) => el === dishId)}
          openModal={this.openModal}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === dishId
          )}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
          onDismiss={this.closeModal}
          onRequestClose={this.closeModal}
        >
          <View style={{ justifyContent: "center", margin: 20 }}>
            <Rating
              showRating
              minValue={1}
              fractions={0}
              startingValue={3}
              onFinishRating={(rating) => this.setState({ rating })}
            />
            <Input
              placeholder="Author"
              leftIcon={<Icon name="user" type="font-awesome" />}
              onChangeText={(author) => this.setState({ author })}
            />
            <Input
              placeholder="Comment"
              leftIcon={<Icon name="comment" type="font-awesome" />}
              onChangeText={(comment) => this.setState({ comment })}
            />
            <View style={{ marginBottom: 15 }}>
              <Button
                onPress={() => this.handleSubmit(dishId)}
                color="#512DA8"
                title="SUBMIT"
              />
            </View>
            <View>
              <Button onPress={this.resetForm} color="gray" title="CANCEL" />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
