import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";

export default function RadioButton(props) {
  const label = props.label;
  const [selected, setSelected] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setSelected(false);
    }
  }, [isFocused]);

  return (
    <TouchableOpacity
      onPress={() => {
        setSelected(!selected);
      }}
      style={styles.buttonContainer}
    >
      <View style={[styles.outerBorder]}>
        {selected ? <View style={styles.innerCircle} /> : null}
      </View>
      <Text
        style={[
          styles.buttonLabel,
          selected ? styles.buttonLabelSelected : null,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  outerBorder: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#69c1d3",
  },
  buttonLabel: {
    fontSize: 18,
    marginLeft: 15,
  },
  buttonLabelSelected: {
    textDecorationLine: "line-through",
  },
});
