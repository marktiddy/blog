import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { EvilIcons } from "@expo/vector-icons";

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  const blogPost = state.find(
    (blogPost) => blogPost.id === navigation.getParam("id")
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

//Add to navigation bar
ShowScreen["navigationOptions"] = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Edit", { id: navigation.getParam("id") })
      }
    >
      <EvilIcons name="pencil" size={30} />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 25,
    paddingBottom: 5,
  },
});

export default ShowScreen;
