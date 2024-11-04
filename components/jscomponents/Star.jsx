export default function first(second) {third}
import React from "react";
import Header from "../components/Header";
//import Message from "../components/Message";
import NavigationBar from "../components/NavigationBar";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";

const all_exes = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLdnVEH3iAkbfz2UnLOTQJakwE2DqkD2W1TeQ_K_nwHg&s",
    name: "Kap ",
    message: "Hello pogi 💖 kumain kna?",
  },
  {
    id: 2,
    image:
      "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4ff6b255e6d49bca840218be424dcc09~c5_720x720.jpeg?lk3s=a5d48078&x-expires=1713794400&x-signature=62aU2wjARjn3xmNVtuYmjDrD2VM%3D",
    name: "Diwata Pares Overload",
    message: "Nag mula sa kalangitan, lumagapak sa kalupaan...",
  },
  {
    id: 3,
    image:
      "https://cdn.vox-cdn.com/thumbor/RcAdlMhw-adDQnJiVWKRPUSP10M=/0x0:2024x1038/1200x800/filters:focal(989x320:1311x642)/cdn.vox-cdn.com/uploads/chorus_image/image/71278865/Screen_Shot_2022_08_23_at_4.22.21_PM.0.png",
    name: "Andrew Tate",
    message: "Women are attracted to strength and power💪",
  },
];

const Nextpage = (navigation, id) => {
  Alert.alert("Confirmation", "Do u want to continue?", [
    {
      text: "Yes",
      onPress: () => {
        navigation.navigate("ViewMsg", id);
        ToastAndroid.show("Navigating to second page", ToastAndroid.SHORT);
      },
    },
    { text: "Cancel" },
  ]);
};

export default function Home({ navigation }) {
  const ListItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <View>
      <Header />
      <FlatList
        style={{ height: 700 }}
        data={all_exes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => Nextpage(navigation, item)}>
            <ListItem item={item} />
          </TouchableOpacity>
        )}
      />
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  home: { backgroundColor: "white" },
  item: {
    flexDirection: "row",
    padding: 20,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "white",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  age: {
    fontSize: 16,
    color: "#666",
  },
});
