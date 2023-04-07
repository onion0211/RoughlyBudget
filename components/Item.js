import { Text, View } from "react-native";
import { utilityService } from "../lib/utilityService";

const Item = ({ name, cost, result, color, size }) => {
  const absCost = utilityService.addCommaText(Math.abs(cost));
  const costText = result
    ? cost < 0
      ? `- ₩ ${absCost}`
      : `₩ ${absCost}`
    : `- ₩ ${absCost}`;
  const textColor = color || "#424242";
  const textSize = size || 15;
  const align = result ? "right" : "auto";
  const minWidth = result ? 130 : 80;
  const marginVertical = result ? 0 : 4;
  const paddingHorizontal = result ? 5 : 0;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: marginVertical,
        paddingHorizontal: paddingHorizontal,
      }}
    >
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
        }}
      >
        {costText}
      </Text>
    </View>
  );
};

export default Item;
