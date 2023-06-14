import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import Card from "./Card";
import { useState, useEffect } from "react";
import db from "../db/firestore";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore/lite";
import { useIsFocused } from "@react-navigation/native";

export default function Favorites({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused();

  async function getRecipes(db) {
    const recipesRef = collection(db, "recipes");
    const recipeSnapshot = await getDocs(
      query(recipesRef, where("isFavorite", "==", true))
    );

    const recipeList = recipeSnapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });
    return recipeList;
  }

  useEffect(() => {
    if (isFocused) {
      getRecipes(db).then((res) => {
        setRecipes(res);
      });
    }
  }, [isFocused]);

  const removeFavorites = (index) => {
    const id = recipes[index].id;
    const recipeRef = doc(db, "recipes", id);
    updateDoc(recipeRef, {
      isFavorite: false,
    })
      .then((response) => {
        ToastAndroid.showWithGravityAndOffset(
          `Removed from favorites`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        getRecipes(db).then((res) => {
          setRecipes(res);
        });
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

  return recipes.length ? (
    <ScrollView
      style={styles.scrollViewStyle}
      contentContainerStyle={{ paddingBottom: 110 }}
    >
      {recipes.map((receipe, index) => {
        return (
          <TouchableOpacity
            style={styles.recipeContainer}
            key={index}
            onPress={() => {
              navigation.navigate("Recipe", { recipe: receipe });
            }}
          >
            <Card
              title={receipe.title}
              description={receipe.description}
              tags={receipe.tags}
              image={receipe.image}
              isFavorite={receipe.isFavorite}
              receipeIndex={index}
              onAddFavorites={removeFavorites}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  ) : (
    <View style={styles.imageContainer}>
      <ImageBackground
        source={require("../assets/noData.png")}
        style={styles.recipeImage}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    paddingTop: 30,
    paddingRight: 20,
    paddingLeft: 20,
  },
  recipeContainer: {
    marginBottom: 20,
  },
  recipeImage: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    flex: 1,
  },
});
