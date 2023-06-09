import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import React, { forwardRef, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  ImageBackground,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewShot from "react-native-view-shot";
import crumpledPaper from "../assets/white-crumpled-paper-texture-for-background.jpg";
import Button from "../components/Button";
import Item from "../components/Item";
import { styles } from "../lib/Style";
import { utilityService } from "../lib/utilityService";

const Receipt = forwardRef(({ data, budget, creditCard, cardValue }, ref) => {
  console.log("##budget, cardValue", budget, cardValue);
  const totalCost = data.reduce((total, item) => total + item.cost, 0);
  const extraMoney = creditCard
    ? budget - totalCost - cardValue
    : budget - totalCost;
  let QRText;

  if (extraMoney < 0) {
    QRText = QRText = `당신의 ${
      creditCard ? "카후" : "세후"
    }는 -${utilityService.addCommaText(
      Math.abs(extraMoney)
    )}원 입니다.\n허리띠 졸라 매야합니다!!!!`;
  } else if (extraMoney === 0) {
    QRText = `당신의 이번 달 ${
      creditCard ? "카후" : "세후"
    }는 없어요! \n다음 달에는 예산 리스트를 줄여보도록 노력합시다아~! ;)`;
  } else {
    QRText = `당신의 이번 달 ${
      creditCard ? "카후" : "세후"
    }는 ${utilityService.addCommaText(
      extraMoney
    )}원 입니다~! \n여유 자금을 알차게 써봐요! ;)`;
  }

  const QRguide =
    "* 스마트폰 카메라를 QR 코드 위에 위치시키세요. \n* QR 코드가 인식되면 자동으로 링크 또는 정보를 불러옵니다. \n* 인식이 안 될 경우, 카메라 앱 설정에서 QR 코드 인식 기능을 활성화하세요. \n* QR 코드가 손상되었을 경우, 해당 링크 또는 정보를 수동으로 입력해주세요. \n* 불필요한 어플리케이션 설치 및 피싱 사기에 주의하세요. 확인되지 않은 QR 코드는 스캔하지 마세요.";
  const requestText =
    "'진짜 월급' 앱에 대해 요청하고 싶은 것, 궁금한 점이 있으시면 아래 메일로 문의해주세요. \n이용해주셔서 감사합니다. \nbdh04085@gmail.com";

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        width: "100%",
      }}
    >
      <ViewShot
        ref={ref}
        options={{
          fileName: `진짜_월급_${utilityService.getToDay()}`,
          format: "jpg",
          quality: 1,
        }}
        style={{ height: "100%" }}
      >
        <ImageBackground
          source={crumpledPaper}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              marginVertical: 30,
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                // borderBottomColor: "#7B7D7D",
                // borderBottomWidth: 2,
                // borderTopWidth: 2,
                // borderTopColor: "#7B7D7D",
                borderStyle: "dashed",
                paddingVertical: 10,
                width: "100%",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  flexWrap: "wrap",
                  fontFamily: "OK_GUNG",
                  fontSize: 50,
                  color: "#424242",
                }}
              >
                진짜 월급
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                paddingHorizontal: 5,
                paddingVertical: 10,
                borderBottomColor: "#7B7D7D",
                borderBottomWidth: 1.5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Galmuri9",
                    color: "#424242",
                  }}
                >{`RID: ${utilityService.randomText(6, true)}`}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Galmuri9",
                    color: "#424242",
                  }}
                >{`전표 No: ${utilityService.randomText(10, false)}`}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Galmuri9",
                    color: "#424242",
                  }}
                >
                  발행일자
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Galmuri9",
                    color: "#424242",
                  }}
                >
                  {utilityService.getToDay()}
                </Text>
              </View>
            </View>
            <View
              style={{ flexGrow: 1, paddingHorizontal: 10, marginVertical: 15 }}
            >
              {data.map((item, index) => (
                <View key={`${item.key}`}>
                  <Item
                    key={index}
                    name={item.name}
                    cost={item.cost}
                    result={false}
                  />
                  {item.sub.length > 0 &&
                    item.sub.map((obj, idx) => {
                      return (
                        <Item
                          key={idx}
                          name={obj.name}
                          cost={Number(utilityService.removeComma(obj.cost))}
                          size={10}
                          result={false}
                          type={"sub"}
                        />
                      );
                    })}
                </View>
              ))}
            </View>
            <View
              style={{
                flexDirection: "column",
                borderTopWidth: 1.5,
                borderTopColor: "#5F5F5F",
                paddingVertical: 10,
              }}
            >
              <Item
                key={"monthBudget"}
                name={"예산"}
                cost={budget}
                result={true}
                color={"#424242"}
                size={20}
              />
              {creditCard && (
                <Item
                  key={"Card"}
                  name={`${new Date().getMonth()}월 카드 값`}
                  cost={cardValue}
                  result={true}
                  color={"#B22211"}
                  size={20}
                  type={"consum"}
                />
              )}
              <Item
                key={"Total"}
                name={"Total"}
                cost={totalCost}
                result={true}
                color={"#B22211"}
                size={20}
                type={"consum"}
              />
            </View>
            <View
              style={{
                borderTopWidth: 1.5,
                borderTopColor: "#5F5F5F",
                paddingVertical: 10,
              }}
            >
              <Item
                key={"extraMoney"}
                name={creditCard ? "카후" : "세후"}
                cost={extraMoney}
                result={true}
                color={"#3833A8"}
                size={20}
              />
            </View>
            <View
              style={{
                paddingVertical: 5,
                borderTopWidth: 1.5,
                borderTopColor: "#5F5F5F",
              }}
            >
              <View
                style={{
                  borderTopWidth: 1.5,
                  borderTopColor: "#5F5F5F",
                  borderBottomWidth: 1,
                  borderBottomColor: "#5F5F5F",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 20,
                }}
              >
                <QRCode
                  value={QRText}
                  backgroundColor="#D5D5D5"
                  color="#424242"
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "Galmuri9",
                    color: "#424242",
                    paddingTop: 10,
                    paddingBottom: 5,
                  }}
                >
                  {QRguide}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: "Galmuri9",
                  color: "#424242",
                  paddingTop: 10,
                  paddingBottom: 5,
                  textAlign: "center",
                }}
              >
                {requestText}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </ViewShot>
    </ScrollView>
  );
});

const BudgetReceiptScreen = ({ navigation, route }) => {
  const { receiptList, monthBudget, creditCard, cardValue } = route.params;

  const data = JSON.parse(receiptList);

  const translateY = useRef(new Animated.Value(1000)).current;
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 2000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  const receiptRef = useRef();

  const hasAndroidPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.canAskAgain && permission.status !== "granted") {
      const permissionResponse = await MediaLibrary.requestPermissionsAsync();
      if (permissionResponse.status !== "granted") return false;
      else return true;
    } else if (permission.status !== "granted") {
      return false;
    } else return true;
  };

  const onSave = async (uri) => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      //갤러리 접근 권한 없다고 알려주기
      return Toast.show(
        '갤러리 접근 권한이 없어요. 설정에서 "진짜 월급"의 권한을 On 해주세요!',
        {
          duration: Toast.durations.SHORT,
          position: 150,
          animation: true,
          hideOnPress: true,
          delay: 0,
          opacity: 0.7,
        }
      );
    }

    await MediaLibrary.saveToLibraryAsync(uri).then(
      Toast.show("갤러리에 영수증을 저장했어요!", {
        duration: Toast.durations.SHORT,
        position: 150,
        animation: true,
        hideOnPress: true,
        delay: 0,
        opacity: 0.7,
      })
    );
  };
  const shareReceipt = async () => {
    const uri = await receiptRef.current
      .capture()
      .catch((err) => console.log("##err : ", err));

    await onSave(uri);
    await Sharing.shareAsync(Platform.OS === "ios" ? `file://${uri}` : uri, {
      mimeType: "image/png",
      dialogTitle: "공유하기",
      UTI: "image/png",
    });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "white" }}
    >
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateY }],
            backgroundColor: "#fff",
            width: "100%",
            marginVertical: 10,
          }}
        >
          <Receipt
            data={data}
            budget={Number(utilityService.removeComma(monthBudget))}
            creditCard={creditCard}
            cardValue={cardValue}
            ref={receiptRef}
          />
        </Animated.View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button
          text={"공유하기"}
          style={{
            paddingVertical: 10,
            alignItem: "center",
          }}
          fontStyle={styles.bottomButtonTextContainer}
          onClick={() => {
            shareReceipt();
          }}
          flexP={true}
        />
        <Button
          text={"돌아가기"}
          style={{
            paddingVertical: 10,
            alignItem: "center",
          }}
          fontStyle={styles.bottomButtonTextContainer}
          onClick={() => {
            navigation.navigate("Main", { creditCard: creditCard });
          }}
          flexP={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default BudgetReceiptScreen;
