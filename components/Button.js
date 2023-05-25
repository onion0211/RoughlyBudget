import { TouchableOpacity, View } from "react-native";
import { Image, Text } from "react-native-elements";
import { Shadow } from "react-native-shadow-2";
import cancel from "../assets/icons/cancel.png";
import plus from "../assets/icons/plus.png";
import reset from "../assets/icons/reset.png";

const Button = ({
  type,
  activeOpacity,
  onClick,
  text,
  style,
  disable,
  fontStyle,
  widthP,
  flexP,
  shadow,
  shadowStyle,
}) => {
  const Type = type || "";
  const ActiveOpacity = activeOpacity || 0.5;
  const Font = fontStyle || {
    fontFamily: "dunggeunmo",
    fontSize: 20,
  };

  const DefaultStyle = {
    width: "auto",
    height: "auto",
    backgroundColor: "green",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  };
  const Style = style || DefaultStyle;
  const ButtonType = () => {
    switch (Type) {
      case "reset":
        return (
          <Image source={reset} style={style || { width: 30, height: 30 }} />
        );
      case "plus":
        return (
          <Image source={plus} style={style || { width: 30, height: 30 }} />
        );
      case "cancel":
        return (
          <Image source={cancel} style={style || { width: 30, height: 30 }} />
        );
      default:
        return (
          <View style={Style}>
            <Text style={Font}>{text}</Text>
          </View>
        );
    }
  };

  const defaultFrame = () => {
    return (
      <TouchableOpacity
        activeOpacity={ActiveOpacity}
        onPress={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        disabled={disable || false}
        style={{
          opacity: disable ? 0.3 : 1,
          width: widthP && "100%",
          flex: flexP && 1,
        }}
      >
        {ButtonType()}
      </TouchableOpacity>
    );
  };

  if (shadow)
    return (
      <Shadow style={shadowStyle} distance={10} startColor={"#00000030"}>
        {defaultFrame()}
      </Shadow>
    );
  else return defaultFrame();
};

export default Button;
