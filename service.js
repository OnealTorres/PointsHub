import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

let stars = [];
let links = [];

export const saveStars = async () => {
  try {
    await AsyncStorage.setItem("stars", JSON.stringify(stars));
    console.log("Star stored successfully");

    const newstars = await AsyncStorage.getItem("stars");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const saveLinks = async () => {
  try {
    await AsyncStorage.setItem("links", JSON.stringify(links));
    console.log("Link stored successfully");
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export default loadStars = async () => {
  try {
    const newstars = await AsyncStorage.getItem("stars");

    if (newstars !== null) {
      stars = JSON.parse(newstars);
      return stars;
    }
  } catch (error) {
    // Error retrieving data
    AsyncStorage.setItem("stars", "");
    console.error("Error retrieving data:", error);
    return stars;
  }
};

export const loadLinks = async () => {
  try {
    const newlinks = await AsyncStorage.getItem("links");

    if (newlinks !== null) {
      links = JSON.parse(newlinks);
      return links;
    }
  } catch (error) {
    // Error retrieving data
    AsyncStorage.setItem("links", "");
    console.error("Error retrieving data:", error);
    return links;
  }
};
export const saveCurrentSelected = (id) => {
  AsyncStorage.setItem("selected", id);
};

export const insertStar = (stname, strating, stgender) => {
  const stid = uuid.v4();
  stars.push({ id: stid, name: stname, rating: strating, gender: stgender });
  links.push({ id: stid, url: "" });
  saveStars();
  saveLinks();
};
export const removeStar = (id) => {
  const starsindex = stars.findIndex((item) => item.id === id);
  const linksindex = links.findIndex((item) => item.id === id);

  if (starsindex !== -1) {
    stars.splice(starsindex, 1);
  }

  if (linksindex !== -1) {
    links.splice(linksindex, 1);
  }
  saveStars();
};
export const getStar = async () => {
  loadStars();
  loadLinks();
  const selected = await AsyncStorage.getItem("selected");
  const starindex = stars.findIndex((item) => item.id === selected);
  const linkindex = links.findIndex((item) => item.id === selected);
  return [stars[starindex], links[linkindex]];
};

export const updateLink = (id, linkstr) => {
  loadLinks();
  const index = links.findIndex((item) => item.id === id);
  links[index]["url"] = linkstr;
  saveLinks();
};

export const searchStar = (name) => {
  loadStars();
  const index = stars.findIndex(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  if (index != -1) {
    return [stars[index]];
  } else {
    return [];
  }
};
