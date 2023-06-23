import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

export default function IngredientsContainer({
  ingredientList,
  onRemoveIngredient,
  onHandleEditChange,
}) {
  const [isEditItem, setIsEditItem] = useState(null);

  return (
    <ScrollView
      style={styles.scrollViewStyle}
      contentContainerStyle={{ paddingBottom: 90 }}
    >
      <View style={{ flex: 1, flexDirection: "column" }}>
        {ingredientList.map((ingredientName, index) => {
          return isEditItem !== index ? (
            <View key={index} style={[styles.ingredientList, styles.inlineRow]}>
              <Text
                style={[
                  styles.ingredientLabel,
                  ingredientName?.isCategory ? styles.categoryLabel : "",
                ]}
              >
                {ingredientName?.isCategory
                  ? ingredientName?.value
                  : ingredientName}
              </Text>
              <Feather
                name="edit-2"
                size={24}
                color="#50AB42"
                onPress={() => setIsEditItem(index)}
                style={styles.editIcon}
              />
              <Feather
                name="trash-2"
                size={24}
                color="#B60C0C"
                onPress={() => onRemoveIngredient(index)}
              />
            </View>
          ) : (
            <View key={index} style={styles.inlineRow}>
              <TextInput
                cursorColor={"#000"}
                selectionColor="#CFCFD5"
                spellCheck={false}
                style={[styles.input, styles.ingredientInput]}
                onChangeText={(text) => onHandleEditChange(text, index)}
                value={
                  ingredientName?.isCategory
                    ? ingredientName?.value
                    : ingredientName
                }
              />
              <Feather
                name="save"
                size={24}
                color="#50AB42"
                onPress={() => setIsEditItem(null)}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ingredientList: {
    borderBottomColor: "#CFCFD5",
    paddingLeft: 0,
  },
  ingredientInput: {
    flex: 1,
    marginRight: 10,
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#CFCFD5",
    padding: 10,
    borderRadius: 5,
  },
  ingredientLabel: {
    padding: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 18,
  },
  categoryLabel: {
    fontSize: 20,
    color: "#089600",
  },
  scrollViewStyle: {
    flex: 1,
  },
  editIcon: {
    marginRight: 10,
  },
});
