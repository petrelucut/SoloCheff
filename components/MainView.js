import {
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import Card from "./Card";
import React, { useState, useEffect } from "react";
import db from "../db/firestore";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore/lite";
import { useIsFocused } from "@react-navigation/native";

export default function MainView({ navigation }) {
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused();

  async function getRecipes(db) {
    const recipesCol = collection(db, "recipes");
    const recipeSnapshot = await getDocs(recipesCol);
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

  const addToFavorites = (index) => {
    const id = recipes[index].id;
    const isFavorite = recipes[index].isFavorite;
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

  return (
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
              onAddFavorites={addToFavorites}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
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
    // color: "orange",
    // fontSize: 30,
  },
});
