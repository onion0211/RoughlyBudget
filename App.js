import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { Image } from "react-native-elements";
import "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import logo from "./assets/RoughlyBudgetLogo.png";
import BudgetReceiptScreen from "./screen/budgetReceipt";
import ChooseScreen from "./screen/chooseType";
import MainScreen from "./screen/main";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const sleep = async (ms) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
  };
  const loadResource = async () => {
    try {
      await Font.loadAsync({
        dunggeunmo: require("./assets/fonts/DungGeunMo.ttf"),
        OK_GUNG: require("./assets/fonts/OK_GUNG.ttf"),
        Galmuri9: require("./assets/fonts/Galmuri9.ttf"),
      });
      // await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(true);
    }
  };
  useEffect(() => {
    loadResource();
  }, []);

  const Stack = createStackNavigator();

  if (isLoading) {
    return (
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ChooseType"
            screenOptions={{ backgroundColor: "white" }}
          >
            <Stack.Screen
              name="ChooseType"
              component={ChooseScreen}
              options={{ headerShown: false }}
            />
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
      </RootSiblingParent>
    );
  } else {
    return (
      <RootSiblingParent>
        <Image source={logo} style={{ width: "100%", height: "100%" }} />
      </RootSiblingParent>
    );
  }
}
