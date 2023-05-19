import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Button from "../components/Button";

const ChooseScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={["#5DD502", "#148000", "#053D00"]}
      style={{ flex: 1 }}
    >
      <StatusBar style="auto" />
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text
          style={{
            width: "100%",
            fontFamily: "OK_GUNG",
            fontSize: 25,
            flexWrap: "wrap",
            color: "white",
            paddingBottom: 30,
            textShadowColor: "#000",
            textShadowOffset: { width: 1, height: 3 },
            textShadowRadius: 10,
            textAlign: "center",
          }}
        >
          당신의 진짜 월급은?
        </Text>
        <View
          style={{
            paddingHorizontal: 15,
            paddingTop: 30,
            justifyContent: "space-evenly",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Button
            text={"카후"}
            style={{
              paddingVertical: 10,
              alignItem: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: 10,
            }}
            fontStyle={{
              flexWrap: "wrap",
              fontFamily: "OK_GUNG",
              fontSize: 25,
              paddingHorizontal: 20,
              paddingVertical: 15,
              textShadowColor: "#196F3D",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 5,
            }}
            onClick={() => {
              navigation.navigate("Main", {
                creditCard: true,
              });
            }}
            shadow={true}
            shadowStyle={{
              borderRadius: 10,
            }}
          />
          <Button
            text={"세후"}
            style={{
              paddingVertical: 10,
              alignItem: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: 10,
            }}
            fontStyle={{
              flexWrap: "wrap",
              fontFamily: "OK_GUNG",
              fontSize: 25,
              paddingHorizontal: 20,
              paddingVertical: 15,
              textShadowColor: "#196F3D",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 5,
            }}
            onClick={() => {
              navigation.navigate("Main", {
                creditCard: false,
              });
            }}
            shadow={true}
            shadowStyle={{
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default ChooseScreen;
