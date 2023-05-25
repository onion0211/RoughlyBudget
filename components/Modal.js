import { Modal, Text, View } from "react-native";
import Button from "./Button";

const ModalComponent = ({ showModal, setShowModal, text, buttonList }) => {
  if (!showModal) return null;
  else
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: "75%",
              backgroundColor: "#fff",
              paddingVertical: 15,
              paddingHorizontal: 10,
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontFamily: "dunggeunmo",
                fontSize: 15,
                justifyContent: "center",
                margin: 15,
                flexWrap: "wrap",
              }}
            >
              {text}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
              }}
            >
              {buttonList.map((item, idx) => {
                return (
                  <Button
                    key={idx}
                    text={item.text}
                    onClick={item.click}
                    style={{
                      backgroundColor: "#388E3C",
                      backgroundColor: "green",
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      borderRadius: 5,
                      marginHorizontal: 5,
                      marginVertical: 10,
                    }}
                    fontStyle={{
                      color: "#fff",
                      textAlign: "center",
                      fontFamily: "dunggeunmo",
                      fontSize: 18,
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    );
};

export default ModalComponent;
