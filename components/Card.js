import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Card({
  title,
  tags,
  image,
  isFavorite,
  onAddFavorites,
  receipeIndex,
}) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.textStyle} numberOfLines={1}>
        {title}
      </Text>
      <Image
        style={styles.recipeImage}
        source={{
          uri: `file:///storage/emulated/0/Pictures/Images/${image}`,
        }}
      />
      <Pressable
        style={styles.addFavorites}
        onPress={() => onAddFavorites(receipeIndex)}
      >
        <FontAwesome5
          name="heart"
          size={24}
          style={isFavorite ? styles.isFavorite : null}
        />
      </Pressable>
      <View style={styles.cardFooter}>
        {tags &&
          tags.map((tag, index) => {
            return (
              <Text
                style={styles.recipeTag}
                key={index}
                onPress={() => {
                  console.log("on tag press");
                  // filter recipes by tag
                }}
              >
                {tag}
              </Text>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "#378DA7",
    fontSize: 24,
    paddingLeft: 20,
    paddingRight: 40,
    paddingBottom: 5,
  },
  cardContainer: {
    backgroundColor: "#E7EBF0",
    borderRadius: 10,
  },
  recipeImage: {
    width: "100%",
    height: 160,
    // resizeMethod: "resize",
  },
  recipeTag: {
    fontSize: 20,
    marginRight: 10,
  },
  cardFooter: {
    maxHeight: 150,
    padding: 20,
    flexDirection: "row",
  },
  addFavorites: {
    position: "absolute",
    right: 10,
    top: 5,
  },
  isFavorite: {
    color: "#D45F5F",
  },
});
