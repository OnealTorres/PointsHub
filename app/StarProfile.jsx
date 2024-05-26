import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import uuid from "react-native-uuid";
import { getStar, updateLink } from "@/service";
import { FontAwesome } from "@expo/vector-icons";

const Item = ({ link }) => {
  return <Text style={{ color: "black" }}>💖 {link}</Text>;
};

export default function StarProfile() {
  const [star, setStar] = useState([]);
  const [link, setLink] = useState([]);
  const [splitlink, setSplitLink] = useState([]);
  const [value, onChangeText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const fetchStar = async () => {
      try {
        const starsData = await getStar();
        setStar(starsData[0]);
        setLink(starsData[1]);

        let links = starsData[1]["url"];

        if (starsData[1]["url"] != []) {
          onChangeText(links);
          setSplitLink(links.split(","));
        }
      } catch (error) {
        console.error("Error loading links:", error);
      }
    };

    fetchStar();
  }, []);

  useEffect(() => {
    const fetchStar = async () => {
      try {
        const starsData = await getStar();
        setStar(starsData[0]);
        setLink(starsData[1]);

        const links = starsData[1]["url"];
        if (links && links.length > 0) {
          onChangeText(links);
          setSplitLink(links.split(","));
        }
      } catch (error) {
        console.error("Error loading links:", error);
      }
    };

    fetchStar();
  }, [isVisible]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setLink(value);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/Points-Hub2.png")}
          style={styles.image}
        />
      </View>
      {isVisible && (
        <View style={styles.item}>
          <View style={styles.textContainer}>
            <Text>{"{"}</Text>
            <TextInput
              editable
              multiline
              numberOfLines={5}
              maxLength={100}
              onChangeText={onChangeText}
              value={value}
              style={styles.textInput}
            />
            <Text>{"}"}</Text>
            <View style={{ flexDirection: "row", gap: 10, paddingTop: 10 }}>
              <Pressable
                style={[styles.modal_button, styles.buttonAdd]}
                onPress={() => {
                  updateLink(link.id, value);
                  toggleVisibility();
                }}
              >
                <Text style={styles.modal_textStyle}>Update</Text>
              </Pressable>

              <Pressable
                style={[styles.modal_button, styles.buttonClose]}
                onPress={() => toggleVisibility()}
              >
                <Text style={styles.modal_textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <View style={styles.item}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>
            {star.gender == "M" ? (
              <FontAwesome name="male" size={20} color="skyblue" />
            ) : (
              <FontAwesome name="female" size={20} color="pink" />
            )}
            &nbsp;
            {star.name}
          </Text>
          <Text style={styles.message}>★&nbsp;{star.rating}</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              paddingTop: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Favorites</Text>
            <TouchableOpacity onPress={toggleVisibility}>
              <FontAwesome
                name="pencil-square-o"
                size={20}
                paddingTop={5}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={{ textAlign: "left", paddingTop: 20 }}>
            <FlatList
              data={splitlink}
              renderItem={({ item }) => <Item link={item} />}
              keyExtractor={(item) => uuid.v4()}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modal_textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  modal_button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#939494",
  },
  buttonAdd: {
    backgroundColor: "#F99B1D",
  },
  textInput: {
    height: 100,
    padding: 10,
    textAlignVertical: "top",
  },
  header: {
    backgroundColor: "#F99B1D",
    paddingTop: 30,
    width: "100%",
    height: 150,
    gap: 50,

    alignItems: "center",
    borderRadius: 20,
  },
  container: {
    backgroundColor: "#191a1c",
    height: "100%",
  },
  message: {
    textAlign: "center",
  },
  item: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 20,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 5,
    borderBottomColor: "#F99B1D",
    borderRadius: 15,
  },
  image: {
    width: 250,
    height: 80,
    borderRadius: 10,
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  age: {
    fontSize: 16,
    color: "#666",
  },
});
