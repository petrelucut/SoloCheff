import { Feather } from "@expo/vector-icons";
import { TextInput, View, StyleSheet, Text, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function MediaContainer({
  ytLink,
  onLinkChange,
  onImageChange,
  imageSource,
}) {
  const takePhoto = async () => {
    const img = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (img.assets) {
      onImageChange(img.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const img = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (img.assets) {
      onImageChange(img.assets[0].uri);
    }
  };

  return (
    <View>
      <View style={styles.inputLabelrRow}>
        <Feather name="youtube" size={24} color={"#50AB42"} />
        <Text style={styles.inputLabel}>YouTube Link</Text>
      </View>
      <TextInput
        value={ytLink}
        style={styles.input}
        onChangeText={(text) => onLinkChange(text)}
        placeholder="Adauga YouTube link"
      />
      <View style={styles.addImageConainer}>
        {imageSource && (
          <Image source={{ uri: imageSource }} style={styles.imagePreview} />
        )}
        <View style={styles.buttonsContainer}>
          <Feather
            name="camera"
            size={36}
            color={"#50AB42"}
            style={styles.takePhoto}
            onPress={takePhoto}
          />
          <Feather
            name="upload"
            size={36}
            color={"#50AB42"}
            onPress={pickImage}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputLabelrRow: {
    flexDirection: "row",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#CFCFD5",
    padding: 10,
    borderRadius: 5,
  },
  inputLabel: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  addImageConainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  imagePreview: {
    width: "100%",
    height: 160,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  takePhoto: {
    marginRight: 20,
  },
});
