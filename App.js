import Footer from "./components/Footer";
import MainView from "./components/MainView";
import AddReceipe from "./components/AddReceipe";
import Recipe from "./components/Recipe";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "./components/Favorites";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
      <Tab.Screen
        name="Home"
        component={MainView}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add"
        component={AddReceipe}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Recipe"
        component={Recipe}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
