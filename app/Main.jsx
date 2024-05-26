import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import loadStars from "@/service";

import { removeStar, saveCurrentSelected, searchStar } from "@/service";
import AddModal from "../components/jscomponents/AddModal";
import { FontAwesome } from "@expo/vector-icons";

export default function Main({ searched }) {
  const [stars, setStars] = useState([]);
  const [reload, setReload] = useState(false); // State variable to trigger reload
  const [searchedtxt, setSearched] = useState(searched);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const starsData = await loadStars();
        if (starsData) {
          setStars(starsData);
        }
      } catch (error) {
        console.error("Error loading stars:", error);
      }
    };

    if (searched == "" || searched == null) {
      fetchStars();
    } else {
      setStars(searchStar(searched));
    }
  }, [reload, searched]); // Watch for changes in reload state

  const handleReload = () => {
    setReload(!reload); // Toggle reload state to trigger reload
  };
  const Star = ({ star }) => {
    return (
      <Link href="/StarProfile" asChild>
        <TouchableOpacity onPress={() => saveCurrentSelected(star.id)}>
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
            </View>

            <Pressable
              style={{ width: 20, height: 40 }}
              onPress={() => {
                removeStar(star.id);
                handleReload();
              }}
            >
              <Text
                style={{
                  color: "red",
                  fontSize: 20,
                  fontWeight: "bold",
                  paddingTop: 10,
                  zIndex: 100,
                }}
              >
                X
              </Text>
            </Pressable>
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      {stars.length > 0 ? (
        <FlatList
          data={stars}
          renderItem={({ item }) => <Star star={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.nothing}>There's nothing here (≖ ͜ʖ≖)...</Text>
      )}

      <AddModal handleReload={handleReload} />
    </View>
  );
}

const styles = StyleSheet.create({
  nothing: {
    color: "white",
    textAlign: "center",
    paddingTop: 100,
  },
  container: {
    padding: 20,
    height: "87%",
  },
  item: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    borderBottomWidth: 5,
    borderBottomColor: "#F99B1D",
    borderRadius: 15,
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
  reloadButton: {
    backgroundColor: "#F99B1D",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  reloadButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
