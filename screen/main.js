import { AntDesign, Feather } from "@expo/vector-icons";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AppBar, IconButton } from "@react-native-material/core";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { Tooltip } from "react-native-elements";
import ModalComponent from "../components/Modal";
import { BudgetCategoryList } from "../data/BudgetCategoryList";
import { styles } from "../lib/Style";
import { utilityService } from "../lib/utilityService";

//H/W font 영향 안받음
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const MainScreen = ({ navigation, route }) => {
  const { creditCard } = route.params;
  console.log("##creditCard", creditCard);

  //AppBar
  const [typeChange, setTypeChange] = useState(creditCard);
  let monthIndex = new Date().getMonth();
  const userType = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            opacity: typeChange ? 1 : 0.5,
            color: "white",
            fontFamily: "OK_GUNG",
          }}
        >
          카후
        </Text>
        <Switch
          value={!typeChange}
          onValueChange={() => {
            setTypeChange(!typeChange);
          }}
          style={{ marginHorizontal: 5 }}
          ios_backgroundColor="white"
          thumbColor={"#103600"}
          trackColor={{ false: "#EDEDED", true: "#EDEDED" }}
        />
        <Text
          style={{
            opacity: !typeChange ? 1 : 0.5,
            color: "white",
            fontFamily: "OK_GUNG",
          }}
        >
          세후
        </Text>
      </View>
    );
  };

  //월급, 카드 값
  const ref_Card = useRef();
  const [salary, setSalary] = useState("");
  const [card, setCard] = useState("");

  //예산 리스트
  const [budgetList, setBudgetList] = useState([]);

  //BottomSheet
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [budgetListCheck, setBudgetListCheck] = useState(false);
  const [budgetListSubCheck, setBudgetListSubCheck] = useState(false);
  const [budgetListSubCostCheck, setBudgetSubCostCheck] = useState(false);

  const buttonHandler = (type) => {
    if (type === "open") {
      setShowAddBudget(true);
    } else if (type === "reset") {
      setBudgetList([]);
    }
  };

  const addBudgetList = (item) => {
    let itemCheck = false;
    budgetList.map((obj) => {
      if (obj.key === item) itemCheck = true;
    });

    if (itemCheck) {
      setBudgetListCheck(true);
      setShowModal(true);
    } else {
      let addItem = BudgetCategoryList.find((obj) => obj.key === item);
      addItem.cost = "";
      addItem.sub = [];
      let list = budgetList;
      list.push(addItem);
      setBudgetList([...list]);
    }
  };

  const changeBudget = ({ value, key, type, category }) => {
    let list = budgetList;
    switch (type) {
      case "change":
        list.map((obj) => {
          if (obj.key === key) {
            obj.cost = Number(utilityService.removeComma(value));
          }
        });
        setBudgetList([...list]);
        break;
      case "del":
        let result = list.filter((obj) => obj.key !== key);
        setBudgetList([...result]);
        break;
      case "add":
        list.map((obj) => {
          if (obj.key === key) {
            if (obj.sub.length < 5) {
              obj.sub.push({
                key: `${obj.key}_sub${obj.sub.length}`,
                name: "",
                cost: "",
              });
            } else {
              setBudgetListSubCheck(true);
              setShowModal(true);
            }
          }
        });
        setBudgetList([...list]);
        break;
      case "subDel":
        list.map((obj) => {
          if (obj.key === category) {
            let result = obj.sub.filter((it) => it.key !== key);
            obj.sub = result;
            obj.cost =
              Number(utilityService.removeComma(obj.cost)) -
              Number(utilityService.removeComma(value));
          }
        });
        setBudgetList([...list]);
        break;
      case "subChangeName":
        list.map((obj) => {
          if (obj.key === category) {
            obj.sub.map((it) => {
              if (it.key === key) it.name = value;
            });
          }
        });
        setBudgetList([...list]);
        break;
      case "subChangeCost":
        let sum = 0;
        list.map((obj) => {
          if (obj.key === category) {
            obj.sub.map((it) => {
              if (it.key === key)
                it.cost = Number(utilityService.removeComma(value));
              if (it.sub !== "")
                sum += Number(utilityService.removeComma(it.cost));
            });
            if (obj.sub.length !== 0) obj.cost = sum;
          }
        });
        setBudgetList([...list]);
        break;
    }
  };

  //Modal
  const [showModal, setShowModal] = useState(false);
  const modalContents = () => {
    let total = 0;
    let categoryZero = false;
    let subZero = false;
    let subName = false;
    let buttonObj = [
      {
        text: "확인",
        click: () => {
          setShowModal(!showModal);
        },
      },
    ];

    if (budgetListCheck)
      return {
        text: "이미 예산 리스트에 있는 항목이에요.",
        button: [
          {
            text: "확인",
            click: () => {
              setBudgetListCheck(false);
              setShowModal(!showModal);
            },
          },
        ],
      };

    if (budgetListSubCheck)
      return {
        text: "세부항목은 한 카테고리에 5개까지 가능해요.",
        button: [
          {
            text: "확인",
            click: () => {
              setBudgetListSubCheck(false);
              setShowModal(!showModal);
            },
          },
        ],
      };

    if (budgetListSubCostCheck)
      return {
        text: "세부항목의 합산으로 처리돼요.",
        button: [
          {
            text: "확인",
            click: () => {
              setBudgetSubCostCheck(false);
              setShowModal(!showModal);
            },
          },
        ],
      };

    if (budgetList.length > 0) {
      budgetList.map((item) => {
        if (item.cost === 0 || item.cost === "") categoryZero = true;
        if (item.sub.length > 0) {
          item.sub.map((obj) => {
            if (obj.cost === 0 || obj.cost === "") subZero = true;
            if (obj.name === "") subName = true;
          });
        }
        total += Number(utilityService.removeComma(item.cost));
      });
    }

    if (salary === 0 || salary === "") {
      //한달 고정 수입 작성 안했을때
      return {
        text: "한 달 고정 수입을 입력해주세요!",
        button: buttonObj,
      };
    } else if (typeChange && (card === 0 || card === "")) {
      return {
        text: `${monthIndex}월 카드 값을 입력해주세요!`,
        button: buttonObj,
      };
    } else if (categoryZero) {
      if (total === 0) {
        return {
          text: "예산 항목 리스트들 금액을 모두 입력해주세요!",
          button: buttonObj,
        };
      } else {
        if (subName) {
          return {
            text: "세부항목의 명목을 입력해주세요!",
            button: buttonObj,
          };
        } else if (subZero) {
          return {
            text: "세부항목의 비용을 입력해주세요!",
            button: buttonObj,
          };
        } else
          return {
            text: "예산 항목 리스트들 중, 금액이 입력안된 항목이 있어요! 입력해주세요 ;)",
            button: buttonObj,
          };
      }
    } else if (subName) {
      return {
        text: "세부항목의 명목을 입력해주세요!",
        button: buttonObj,
      };
    } else if (subZero) {
      return {
        text: "세부항목의 비용을 입력해주세요!",
        button: buttonObj,
      };
    } else if (total > salary) {
      return {
        text: "한 달 고정 수입액보다 예산 리스트 항목 합산이 더 많아요..ㅠㅅㅠ \n이러면 마이너스인데 이대로 진행할까요?",
        button: [
          {
            text: "확인",
            click: () => {
              navigation.navigate("budgetReceipt", {
                receiptList: JSON.stringify(budgetList),
                monthBudget: Number(utilityService.removeComma(salary)),
                creditCard: typeChange,
                cardValue: Number(utilityService.removeComma(card)),
              });
              setShowModal(!showModal);
            },
          },
          {
            text: "취소",
            click: () => {
              setShowModal(!showModal);
            },
          },
        ],
      };
    } else {
      return {
        text: "이대로 진행하면 될까요? 추가로 수정할 사항이 있다면, 취소 버튼을 누른 뒤 수정해주세요!",
        button: [
          {
            text: "확인",
            click: () => {
              navigation.navigate("budgetReceipt", {
                receiptList: JSON.stringify(budgetList),
                monthBudget: Number(utilityService.removeComma(salary)),
                creditCard: typeChange,
                cardValue: Number(utilityService.removeComma(card)),
              });
              setShowModal(!showModal);
            },
          },
          {
            text: "취소",
            click: () => {
              setShowModal(!showModal);
            },
          },
        ],
      };
    }
  };

  //Tooltip
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
      }}
    >
      <StatusBar style="auto" />
      <AppBar
        title="진짜 월급"
        titleStyle={{ fontFamily: "OK_GUNG" }}
        subtitle={`${monthIndex + 1}월`}
        subtitleStyle={{ fontFamily: "OK_GUNG" }}
        trailing={userType}
        color="#288501"
        elevation={0}
        contentContainerStyle={{ marginVertical: 3 }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ fontFamily: "dunggeunmo", minWidth: 80 }}>예산</Text>
        <TextInput
          value={utilityService.addCommaText(salary)}
          onChangeText={(value) => {
            setSalary(Number(utilityService.removeComma(value)));
          }}
          keyboardType="numeric"
          placeholder="0"
          isFocused={true}
          style={{
            borderBottomColor: "#000000",
            borderBottomWidth: 1,
            minWidth: 130,
            textAlign: "right",
            fontFamily: "dunggeunmo",
            fontSize: 20,
          }}
          autoFocus={true}
          returnKeyType={typeChange ? "next" : "default"}
          onSubmitEditing={() => {
            if (typeChange) ref_Card.current.focus();
          }}
        />
        <Text style={{ fontFamily: "dunggeunmo" }}>원</Text>
      </View>
      {typeChange && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{ fontFamily: "dunggeunmo", minWidth: 80 }}
          >{`${monthIndex}월 카드 값`}</Text>
          <TextInput
            value={utilityService.addCommaText(card)}
            onChangeText={(value) => {
              setCard(Number(utilityService.removeComma(value)));
            }}
            keyboardType="numeric"
            placeholder="0"
            style={{
              borderBottomColor: "#000000",
              borderBottomWidth: 1,
              minWidth: 130,
              textAlign: "right",
              fontFamily: "dunggeunmo",
              fontSize: 20,
            }}
            ref={ref_Card}
          />
          <Text style={{ fontFamily: "dunggeunmo" }}>원</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 5,
          paddingHorizontal: 20,
        }}
      >
        <IconButton
          icon={(props) => <Icon name="plus" size={15} {...props} />}
          onPress={() => {
            Keyboard.dismiss();
            buttonHandler("open");
            // if (typeChange) ref_Card.current.blur();
          }}
          style={{ width: 30, height: 30 }}
        />
        <IconButton
          icon={(props) => <Icon name="reload" size={15} {...props} />}
          color="red"
          onPress={() => buttonHandler("reset")}
          style={{
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </View>
      <View
        style={{
          alignItems: "flex-start",
          paddingHorizontal: 20,
          marginBottom: 5,
        }}
      >
        <Tooltip
          visible={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          backgroundColor={"#fff"}
          pointerColor={"#006404"}
          containerStyle={{
            width: "85%",
            height: "auto",
            borderColor: "#006404",
            borderWidth: 1,
          }}
          popover={
            <Text style={{ color: "#006404", fontFamily: "dunggeunmo" }}>
              {
                "1. 카테고리는 '+' 버튼을 누르면 추가 할 수 있어요.\n2. 카테고리당 세부항목은 5개까지 가능해요.\n3. 세부항목이 있는 카테고리의 금액은 입력된 금액은 무시되고, 세부항목들 금액의 합산으로 처리돼요."
              }
            </Text>
          }
        >
          <AntDesign name="infocirlceo" size={15} />
        </Tooltip>
      </View>
      <View
        style={{
          flex: 1,
          marginBottom: 60,
        }}
      >
        <ScrollView
          style={{
            marginHorizontal: 20,
          }}
        >
          {budgetList.map((item, idx) => {
            return (
              <View
                key={item.key}
                style={{ flexDirection: "column", marginVertical: 4 }}
              >
                <View
                  key={item.key}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={item.icon}
                    style={{ width: 20, height: 20, marginRight: 10 }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "dunggeunmo",
                      maxWidth: 50,
                      minWidth: 50,
                    }}
                  >
                    {item.name}
                  </Text>
                  <TextInput
                    key={`${item.key}_cost`}
                    value={utilityService.addCommaText(item.cost)}
                    onChangeText={(v) => {
                      if (item.sub.length > 1) {
                        setBudgetSubCostCheck(true);
                        setShowModal(true);
                      } else
                        changeBudget({
                          value: v,
                          key: item.key,
                          type: "change",
                        });
                    }}
                    keyboardType="numeric"
                    placeholder="0"
                    style={{
                      borderBottomColor: "#000000",
                      borderBottomWidth: 1,
                      width: 100,
                      textAlign: "right",
                      fontFamily: "dunggeunmo",
                      fontSize: 15,
                      marginHorizontal: 15,
                    }}
                  />
                  <Icon
                    name="plus"
                    onPress={() => {
                      changeBudget({ type: "add", key: item.key });
                    }}
                    size={20}
                  />
                  <Icon
                    name="close"
                    color="red"
                    onPress={() => {
                      changeBudget({ type: "del", key: item.key });
                    }}
                    size={20}
                  />
                </View>
                {item.sub &&
                  item.sub.map((obj) => {
                    return (
                      <View
                        key={obj.key}
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          marginLeft: 15,
                          marginVertical: 2,
                        }}
                      >
                        <Feather
                          name="corner-down-right"
                          size={10}
                          color="black"
                        />
                        <TextInput
                          key={`${obj.key}_name`}
                          value={obj.name}
                          onChangeText={(value) => {
                            changeBudget({
                              type: "subChangeName",
                              key: obj.key,
                              category: item.key,
                              value: value,
                            });
                          }}
                          multiline
                          placeholder="카테고리"
                          style={{
                            borderBottomColor: "#000000",
                            borderBottomWidth: 1,
                            width: 50,
                            textAlign: "center",
                            fontFamily: "dunggeunmo",
                            fontSize: 13,
                            marginHorizontal: 15,
                            flexWrap: "wrap",
                          }}
                        />
                        <TextInput
                          key={`${obj.key}_cost`}
                          value={utilityService.addCommaText(obj.cost)}
                          onChangeText={(value) => {
                            changeBudget({
                              type: "subChangeCost",
                              key: obj.key,
                              category: item.key,
                              value: value,
                            });
                          }}
                          keyboardType="numeric"
                          placeholder="0"
                          style={{
                            borderBottomColor: "#000000",
                            borderBottomWidth: 1,
                            width: 130,
                            textAlign: "right",
                            fontFamily: "dunggeunmo",
                            fontSize: 13,
                            marginHorizontal: 15,
                          }}
                        />
                        <Icon
                          name="close"
                          color="red"
                          onPress={() => {
                            changeBudget({
                              type: "subDel",
                              key: obj.key,
                              category: item.key,
                              value: obj.cost,
                            });
                          }}
                          size={15}
                        />
                      </View>
                    );
                  })}
                {idx !== budgetList.length - 1 && (
                  <View
                    style={{
                      marginTop: 8,
                      borderColor: "#C3C3C3",
                      borderBottomWidth: 1,
                    }}
                  />
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <AppBar
        variant="bottom"
        transparent={true}
        style={{ position: "absolute", start: 0, end: 0, bottom: 0 }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setShowModal(true);
          }}
          style={{
            paddingVertical: 10,
            width: "100%",
            alignItem: "center",
            position: "absolute",
            bottom: 0,
          }}
        >
          <Text style={styles.bottomButtonTextContainer}>진짜 월급은?</Text>
        </TouchableOpacity>
      </AppBar>

      <BottomSheet
        visible={showAddBudget}
        onBackButtonPress={() => {
          setShowAddBudget(false);
        }}
        onBackdropPress={() => {
          setShowAddBudget(false);
        }}
      >
        <View style={styles.bottomNavigationView}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetHeaderText}>
              카테고리를 선택해주세요.
            </Text>
          </View>
          <FlatList
            data={BudgetCategoryList}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  addBudgetList(item.key);
                }}
                style={styles.bottomSheetIconContainer}
                key={item.key}
              >
                <Image source={item.icon} style={{ width: 45, height: 45 }} />
                <Text style={styles.bottomSheetIconText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            numColumns={4}
            style={styles.bottomSheetBody}
          />
        </View>
      </BottomSheet>

      {showModal && (
        <ModalComponent
          showModal={showModal}
          setShowModal={setShowModal}
          text={modalContents().text}
          buttonList={modalContents().button}
        />
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
