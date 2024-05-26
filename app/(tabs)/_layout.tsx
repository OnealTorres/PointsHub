import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Header from "@/components/jscomponents/Header";
import Main from "@/app/Main";

import loadStars from "@/service";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [searched, setSearched] = useState("");
  useEffect(() => {
    loadStars();
  }, []);

  function handleSearch(text: string) {
    setSearched(text);
  }
  return (
    <View
      style={{ backgroundColor: "#191a1c", paddingTop: 40, height: "100%" }}
    >
      <Header handleSearch={handleSearch} />
      <Main searched={searched} />
    </View>
  );
}
