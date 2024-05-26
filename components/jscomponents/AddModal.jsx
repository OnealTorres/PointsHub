import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { insertStar } from "@/service";

export default function AddModal({ handleReload }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, onChangeName] = useState("");
  const [rate, onChangeRate] = useState("");
  const [gender, onChangeGender] = useState("");

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>New Star</Text>
            <TextInput
              style={styles.name}
              placeholder="Name"
              onChangeText={onChangeName}
              value={name}
            />
            <TextInput
              style={styles.name}
              placeholder="Rating"
              keyboardType="numeric"
              onChangeText={onChangeRate}
              value={rate}
            />
            <TextInput
              style={styles.name}
              placeholder="Gender [M/F]"
              maxLength={1}
              onChangeText={(e) => {
                if (e === "M" || e === "F" || e === "") {
                  onChangeGender(e);
                }
              }}
              value={gender}
            />

            <View style={{ flexDirection: "row", gap: 10, paddingTop: 10 }}>
              <Pressable
                style={[styles.modal_button, styles.buttonAdd]}
                onPress={() => {
                  onChangeName("");
                  onChangeRate("");
                  onChangeGender("");
                  setModalVisible(!modalVisible);
                  insertStar(name, rate, gender);
                  handleReload();
                }}
              >
                <Text style={styles.modal_textStyle}>Create</Text>
              </Pressable>

              <Pressable
                style={[styles.modal_button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modal_textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    backgroundColor: "#E9EAEC",
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal_button: {
    borderRadius: 20,
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 2,
    height: 40,
  },
  buttonClose: {
    backgroundColor: "#939494",
  },
  buttonAdd: {
    backgroundColor: "#F99B1D",
  },

  button: {
    position: "absolute",
    right: 20,
    bottom: 40,
    borderRadius: 50,
    paddingBottom: 2,

    width: 70,
    height: 70,
  },
  buttonOpen: {
    backgroundColor: "#F99B1D",
  },
  modal_textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 50,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
});
