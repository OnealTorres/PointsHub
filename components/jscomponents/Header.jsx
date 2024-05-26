import { React, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Header({ handleSearch }) {
  const [text, onChangeText] = useState("");
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.searchbar_container}>
          <Image
            source={require("@/assets/images/Vertical PH.png")}
            style={styles.image}
          />
          <TextInput
            style={styles.searchbar}
            placeholder="Search..."
            onChangeText={onChangeText}
            value={text}
          />
          <Pressable
            style={[styles.button, styles.buttonAdd]}
            onPress={() => {
              handleSearch(text);
            }}
          >
            <FontAwesome name="search" size={24} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 47,
    objectFit: "contain",
    borderRadius: 5,
    marginRight: 5,
  },
  searchbar_container: {
    flexDirection: "row",
  },
  button: {
    width: 80,
    height: 50,
    backgroundColor: "black",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    paddingLeft: 25,
    justifyContent: "center",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F99B1D",
    width: "100%",
    height: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  searchbar: {
    backgroundColor: "white",
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: "grey",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    paddingLeft: 20,
  },
  sbitem: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    paddingLeft: 20,
    paddingTop: 10,
  },
});
