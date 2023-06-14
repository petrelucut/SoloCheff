import { Text, View, StyleSheet, TouchableWithoutFeedback } from "react-native";

export default function Tabs({ tabs, onTabChange, activeTab }) {
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab, index) => {
        return (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => onTabChange(index)}
          >
            <View
              style={[
                styles.tabItem,
                activeTab === index ? styles.activeTab : null,
              ]}
            >
              <Text
                style={[
                  styles.tabName,
                  activeTab === index ? styles.activeTabName : null,
                ]}
              >
                {tab}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
  },
  tabItem: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderBottomColor: "#CFCFD5",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  tabName: {
    fontSize: 16,
  },
  activeTab: {
    borderBottomColor: "#0d729e",
    borderBottomWidth: 2,
  },
  activeTabName: {
    color: "#0d729e",
  },
});
