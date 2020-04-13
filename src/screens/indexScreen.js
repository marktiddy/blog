import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
//import our context
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  //A variable to link useContext hook and our blogContext object
  //This will have the same value as our value prop so can include functions
  //Destructure to get both properties
  const { state, deleteBlogPost, getBlogPosts } = useContext(Context);

  useEffect(() => {
    getBlogPosts();

    //Reload state when we come back to the screen
    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
    });
    //Clean up from our listener when index screen is stopped
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View>
      <Text style={styles.mainTitle}>Latest Posts</Text>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather name="trash" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

//Add to navigation bar
IndexScreen["navigationOptions"] = ({ navigation }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate("Create")}>
      <Feather name="plus" size={30} />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "gray",
  },
  mainTitle: {
    fontSize: 25,
    paddingBottom: 15,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
