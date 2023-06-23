import {
  StyleSheet,
  View,
  ToastAndroid,
  Text,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import IngredientsContainer from "./CreateRecipe/IngredientsContainer";
import Tabs from "./Tabs";
import Textarea from "./CreateRecipe/Textarea";
import MediaContainer from "./CreateRecipe/MediaContainer";
import * as MediaLibrary from "expo-media-library";
import db from "../db/firestore";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore/lite";

export default function AddReceipe({ navigation }) {
  const [name, setName] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [description, setDescription] = useState("");
  const [ytLink, setYtLink] = useState("");
  const [recipeImage, setRecipeImage] = useState("");

  const addIngredient = () => {
    ingredient && setIngredientList([...ingredientList, ingredient]);
    setIngredient("");
  };

  const addIngredientCategory = () => {
    ingredient &&
      setIngredientList([
        ...ingredientList,
        { value: ingredient, isCategory: true },
      ]);
    setIngredient("");
  };

  const removeIngredient = (index) => {
    setIngredientList(ingredientList.filter((_, item) => item !== index));
  };

  const handleEditChange = (text, index) => {
    let items = [...ingredientList];
    if (items[index]?.isCategory) {
      items[index].value = text;
      setIngredientList(items);
      return;
    }
    items[index] = text;
    setIngredientList(items);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  let tabContent = (
    <View style={{ flex: 1 }}>
      <View style={styles.inlineRow}>
        <TextInput
          cursorColor={"#000"}
          selectionColor="#CFCFD5"
          spellCheck={false}
          style={[styles.input, styles.ingredientInput]}
          onChangeText={setIngredient}
          value={ingredient}
        />
        <Feather
          name="plus-circle"
          size={24}
          color={ingredient ? "#50AB42" : "#CBD6CA"}
          onPress={addIngredient}
          style={styles.addIngredientButton}
        />
        <Feather
          name="layers"
          size={24}
          color={ingredient ? "#50AB42" : "#CBD6CA"}
          onPress={addIngredientCategory}
        />
      </View>
      <IngredientsContainer
        ingredientList={ingredientList}
        onRemoveIngredient={removeIngredient}
        onHandleEditChange={handleEditChange}
      />
    </View>
  );

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const saveImage = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.granted) {
      try {
        const asset = await MediaLibrary.createAssetAsync(recipeImage);
        MediaLibrary.createAlbumAsync("Images", asset, false)
          .then((res) => {
            saveToFirestore(asset.filename);
          })
          .catch(() => {
            console.log("Error In Saving File!");
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Need Storage permission to save file");
    }
  };

  const validateRecipe = () => {
    if (!ingredientList.length) {
      return "Adauga cel putin un ingredient pentru reteta";
    }

    if (!name) {
      return "Adauga nume reteta";
    }

    if (!description) {
      return "Adauga o descriere";
    }

    return false;
  };

  const clearState = () => {
    setName("");
    setIngredient("");
    setIngredientList([]);
    setActiveTab(0);
    setDescription("");
    setYtLink("");
    setRecipeImage("");
  };

  const saveToFirestore = (imageName) => {
    const data = {
      title: name,
      description: description,
      image: imageName,
      ytLink: ytLink,
      isFavorite: false,
      ingredients: ingredientList,
    };

    const recipeRef = collection(db, "recipes");
    addDoc(recipeRef, data)
      .then((response) => {
        ToastAndroid.showWithGravityAndOffset(
          `Reteta adaugata cu success`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        clearState();
        navigation.navigate("Home");
      })
      .catch((error) => {
        ToastAndroid.showWithGravityAndOffset(
          `A aparut o eroare, te rugam sa reincerci`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      });
  };

  const addNewRecipe = () => {
    const invalidRecipe = validateRecipe();

    if (invalidRecipe) {
      Alert.alert("Date insuficiente", invalidRecipe, [{ text: "OK" }]);
      return;
    }
    saveImage();
  };

  if (activeTab === 1) {
    tabContent = (
      <Textarea value={description} onInputChange={handleDescriptionChange} />
    );
  }

  if (activeTab === 2) {
    tabContent = (
      <MediaContainer
        ytLink={ytLink}
        onLinkChange={setYtLink}
        onImageChange={setRecipeImage}
        imageSource={recipeImage}
      />
    );
  }

  return (
    <View style={styles.scrollViewStyle}>
      <View style={styles.recipeHeader}>
        <Text style={styles.textStyle}> Creeaza o reteta noua</Text>
        <Feather
          name="save"
          size={26}
          color={"#50AB42"}
          style={styles.saveButton}
          onPress={addNewRecipe}
        />
      </View>

      <View>
        <Text style={styles.inputLabel}>Nume reteta</Text>
        <TextInput
          cursorColor={"#000"}
          selectionColor="#CFCFD5"
          spellCheck={false}
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Adauga nume reteta"
        />
      </View>
      <View style={styles.ingredientsContainer}>
        <Tabs
          tabs={["Ingrediente", "Descriere", "Media"]}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </View>
      {tabContent}
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 24,
  },
  scrollViewStyle: {
    paddingTop: 30,
    paddingRight: 20,
    paddingLeft: 20,
    flex: 1,
  },
  recipeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    marginTop: 10,
  },
  saveButton: {
    marginTop: 10,
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
  ingredientsContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  ingredientInput: {
    marginRight: 10,
    flex: 1,
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addIngredientButton: {
    marginRight: 10,
  },
});
