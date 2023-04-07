import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import BudgetReceiptScreen from "./screen/budgetReceipt";
import MainScreen from "./screen/main";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadResource() {
      try {
        await Font.loadAsync({
          dunggeunmo: require("./assets/fonts/DungGeunMo.ttf"),
          OK_GUNG: require("./assets/fonts/OK_GUNG.ttf"),
          Galmuri9: require("./assets/fonts/Galmuri9.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(true);
      }
    }
    loadResource();
  }, [isLoading]);

  const Stack = createStackNavigator();

  if (isLoading) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{ backgroundColor: "white" }}
        >
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="budgetReceipt"
            component={BudgetReceiptScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return null;
  }
}
