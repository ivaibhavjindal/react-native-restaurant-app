import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-elements";

const contactUsData = [
  "121, Clear Water Bay Road",
  "Clear Water Bay, Kowloon",
  "HONG KONG",
  "Tel: +852 1234 5678",
  "Fax: +852 8765 4321",
  "Email:confusion@food.net",
];

const ContactUs = () => {
  return (
    <View>
      <Card title={"Our Address"}>
        {contactUsData.map((data, index) => (
          <Text style={{ margin: 10 }} key={index}>
            {data}
          </Text>
        ))}
      </Card>
    </View>
  );
};

export default ContactUs;
