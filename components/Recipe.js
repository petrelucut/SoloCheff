import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  ToastAndroid,
  TouchableOpacity,
  Modal,
  Pressable,
  ImageBackground,
} from "react-native";
import RadioButton from "./RadioButton";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";
import { updateDoc, doc, getDoc } from "firebase/firestore/lite";
import db from "../db/firestore";

export default function AddReceipe({ navigation, route }) {
  const [recipe, setRecipe] = useState(route.params.recipe);
  const [moreButtonOpen, setMoreButtonOpen] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isImageFullScreen, setIsImageFullScreen] = useState(false);
  const handleMoreButton = () => {
    setMoreButtonOpen(!moreButtonOpen);
  };
  const isFocused = useIsFocused();

  const handleOpenPlayer = () => {
    if (recipe.ytLink) {
      setIsPlayerOpen(!isPlayerOpen);
    }
  };

  const getYtId = (link) => {
    if (link.includes("?v=")) {
      if (link.includes("&list=")) {
        return link.substring(
          link.indexOf("?v=") + 3,
          link.lastIndexOf("&list=")
        );
      }
      return link.split("?v=")[1];
    }

    return link.split("/")[3];
  };

  const addToFavorites = () => {
    const id = recipe.id;
    const isFavorite = recipe.isFavorite;
    const recipeRef = doc(db, "recipes", id);
    updateDoc(recipeRef, {
      isFavorite: !isFavorite,
    })
      .then((response) => {
        const message = isFavorite ? "removed from" : "added to";
        ToastAndroid.showWithGravityAndOffset(
          `Recipe ${message} favorites!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        getRecipe(id);
      })
      .catch((error) => {
        ToastAndroid.showWithGravityAndOffset(
          `An error occured. Please try again.`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      });
  };

  const getRecipe = async (id) => {
    const recipeRef = doc(db, "recipes", id);
    try {
      const docSnap = await getDoc(recipeRef);
      setRecipe({ id, ...docSnap.data() });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setMoreButtonOpen(false);
      setIsPlayerOpen(false);
      setRecipe(route.params.recipe);
    }
  }, [isFocused]);

  const openImage = () => {
    setIsImageFullScreen(true);
  };

  return (
    <View style={{ height: "100%" }}>
      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        <View>
          <TouchableOpacity onPress={openImage}>
            <Image
              source={{
                uri: `file:///storage/emulated/0/Pictures/Images/${recipe.image}`,
              }}
              style={styles.recipeImage}
            />
          </TouchableOpacity>
          <Modal
            visible={isImageFullScreen}
            transparent={true}
            onRequestClose={() => setIsImageFullScreen(false)}
          >
            <ImageBackground
              source={{
                uri: `file:///storage/emulated/0/Pictures/Images/${recipe.image}`,
              }}
              style={styles.fullScreenImage}
            >
              <Pressable
                style={styles.closeImageButton}
                onPress={() => setIsImageFullScreen(false)}
              >
                <Feather name="x-circle" size={24} color="black" />
              </Pressable>
            </ImageBackground>
          </Modal>

          <Text style={styles.titleStyle}>{recipe.title}</Text>
          <Text style={styles.ingredientsTitle}>Ingrediente</Text>
          <View style={styles.ingredientsContainer}>
            {recipe?.ingredients &&
              recipe.ingredients.map((ingredient, index) => {
                return (
                  <View style={styles.ingredientItem} key={index}>
                    {ingredient?.isCategory ? (
                      <Text style={styles.categoryLabel}>
                        {ingredient.value}
                      </Text>
                    ) : (
                      <RadioButton label={ingredient} />
                    )}
                  </View>
                );
              })}
          </View>
          <Text style={styles.descriptionText}>{recipe.description}</Text>
        </View>
      </ScrollView>
      <Feather
        name={moreButtonOpen ? "chevron-down" : "chevron-up"}
        size={24}
        style={styles.moreButton}
        onPress={handleMoreButton}
      />
      {moreButtonOpen && (
        <View style={styles.editButton}>
          <Feather name="edit" size={24} style={styles.functionButtons} />
          <Feather
            name="heart"
            size={24}
            style={[
              styles.functionButtons,
              recipe.isFavorite ? styles.isFavorite : "",
            ]}
            onPress={addToFavorites}
          />
          <Feather
            name="video"
            size={24}
            style={[
              styles.functionButtons,
              isPlayerOpen ? styles.activeButton : "",
              !recipe.ytLink ? styles.buttonDisabled : "",
            ]}
            onPress={handleOpenPlayer}
          />
        </View>
      )}
      {isPlayerOpen && (
        <View style={styles.playerStyle}>
          <YoutubePlayer height={350} videoId={getYtId(recipe.ytLink) || ""} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    alignSelf: "center",
    color: "#378DA7",
    fontSize: 30,
    marginBottom: 10,
  },
  scrollViewStyle: {
    paddingTop: 40,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20,
  },
  recipeImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 20,
  },
  fullScreenImage: {
    flex: 1,
  },
  descriptionText: {
    fontSize: 18,
  },
  moreButton: {
    position: "absolute",
    right: 10,
    bottom: 100,
    display: "flex",
    backgroundColor: "#378DA7",
    borderRadius: 50,
    padding: 10,
  },
  editButton: {
    position: "absolute",
    right: 10,
    bottom: 145,
  },
  functionButtons: {
    backgroundColor: "#378DA7",
    padding: 10,
    marginBottom: 10,
    borderRadius: 50,
    color: "#000000",
  },
  playerStyle: {
    position: "absolute",
    top: 0,
    height: 350,
    width: "100%",
  },
  activeButton: {
    backgroundColor: "#97bdda",
  },
  isFavorite: {
    color: "#D45F5F",
  },
  ingredientsContainer: {
    marginBottom: 15,
  },
  ingredientItem: {
    marginBottom: 10,
  },
  categoryLabel: {
    fontSize: 20,
    color: "#089600",
  },
  ingredientsTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  closeImageButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  buttonDisabled: {
    backgroundColor: "#8dc5d67b",
    color: "#808080",
  },
});
