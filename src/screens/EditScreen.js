import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";

const EditScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const blogPost = state.find(
    (blogPost) => blogPost.id === navigation.getParam("id")
  );
  const [title, setTitle] = useState(blogPost.title);
  const [content, setcontent] = useState(blogPost.content);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editing {blogPost.title}</Text>
      <Text style={styles.editTitle}>Edit Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.editTitle}>Edit Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 25,
    paddingBottom: 10,
  },
  editTitle: {
    fontSize: 20,
    paddingBottom: 10,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
});

export default EditScreen;
