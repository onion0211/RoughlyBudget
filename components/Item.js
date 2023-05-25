import { Text, View } from "react-native";
import { Image } from "react-native-elements";
import corner_D from "../assets/corner_down_arrow.png";
import { utilityService } from "../lib/utilityService";

const Item = ({ name, cost, result, color, size, type }) => {
  const absCost = utilityService.addCommaText(Math.abs(cost));
  const costText = result
    ? cost < 0 || type === "consum"
      ? `- ₩ ${absCost}`
      : `₩ ${absCost}`
    : `- ₩ ${absCost}`;
  const textColor = color || "#424242";
  const textSize = size || 15;
  const align = result ? "right" : "auto";
  const minWidth = result ? 130 : 80;
  const marginVertical = result ? 0 : 4;
  const paddingHorizontal = type === "sub" ? 15 : result ? 5 : 0;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: type === "sub" ? "flex-start" : "space-between",
        alignItems: "center",
        marginVertical: marginVertical,
        paddingHorizontal: paddingHorizontal,
      }}
    >
      {type === "sub" && (
        <Image
          source={corner_D}
          style={{
            width: 15,
            height: 15,
            marginRight: 20,
          }}
        />
      )}
      <Text
        style={{
          fontSize: textSize,
          fontFamily: "Galmuri9",
          color: textColor,
          minWidth: minWidth,
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          fontSize: textSize,
          fontFamily: "Galmuri9",
          fontVariant: "tabular-nums",
          color: textColor,
          flexShrink: 1,
          textAlign: align,
          right: type === "sub" ? 0 : 0,
          position: type === "sub" ? "absolute" : "relative",
        }}
      >
        {costText}
      </Text>
    </View>
  );
};

export default Item;
