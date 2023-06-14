import { View, TextInput, StyleSheet } from "react-native";

export default function Textarea({ value, onInputChange }) {
  return (
    <View>
      <TextInput
        style={styles.textArea}
        multiline={true}
        numberOfLines={6}
        value={value}
        onChangeText={(text) => onInputChange(text)}
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#CFCFD5",
    padding: 10,
    textAlignVertical: "top",
    maxHeight: 350,
  },
});
