import { StyleSheet, View, Pressable, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Footer({ state, navigation }) {
  return (
    <View style={styles.footer}>
      <Pressable
        style={styles.bottomButtons}
        onPress={() => navigation.navigate("Home")}
      >
        <FontAwesome5
          name="home"
          size={24}
          style={state.index === 0 ? styles.butonActive : styles.buttonIcon}
        />
      </Pressable>
      <Pressable
        style={styles.bottomButtons}
        onPress={() => navigation.navigate("Add")}
      >
        <FontAwesome5
          name="plus-circle"
          size={24}
          style={state.index === 1 ? styles.butonActive : styles.buttonIcon}
        />
      </Pressable>
      <Pressable
        style={styles.bottomButtons}
        onPress={() => navigation.navigate("Favorites")}
      >
        <FontAwesome5
          name="heart"
          size={24}
          style={state.index === 2 ? styles.butonActive : styles.buttonIcon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f0e9e2",
    flexDirection: "row",
    height: 80,
    alignItems: "center",
  },
  bottomButtons: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  footerText: {
    color: "white",
    fontWeight: "bold",
    alignItems: "center",
    fontSize: 18,
  },
  buttonIcon: {
    color: "#2a6062",
  },
  butonActive: {
    color: "#81b994",
  },
});
