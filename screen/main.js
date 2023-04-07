import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { BottomSheet } from "react-native-btr";
import { ListItem } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../components/Button";
import ModalComponent from "../components/Modal";
import { BudgetCategoryList } from "../data/BudgetCategoryList";
import { utilityService } from "../lib/utilityService";
import { styles } from "../Style";

//H/W font 영향 안받음
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const MainScreen = ({ navigation }) => {
  const [budgetList, setBudgetList] = useState({});
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [budgetListCheck, setBudgetListCheck] = useState(false);

  const [monthBudget, setMonthBudget] = useState(0);

  const onChangePoints = (e) => {
    setMonthBudget(Number(utilityService.removeComma(e)));
  };

  const buttonHandler = (type) => {
    if (type === "open") {
      setShowAddBudget(true);
    } else if (type === "reset") {
      setBudgetList({});
    }
  };

  const addBudgetList = (item) => {
    let itemCheck = false;
    Object.keys(budgetList).map((key) => {
      if (key === item) itemCheck = true;
    });

    if (itemCheck) {
      setBudgetListCheck(true);
      setShowModal(true);
    } else {
      let addItem = BudgetCategoryList.find((obj) => obj.key === item);
      addItem.cost = 0;
      setBudgetList({
        ...budgetList,
        [item]: addItem,
      });
    }
  };

  const changeBudget = (e, key, type) => {
    if (type === "add") {
      let obj = budgetList[key];
      obj.cost = Number(utilityService.removeComma(e));
      setBudgetList({
        ...budgetList,
        [key]: obj,
      });
    } else if (type === "del") {
      let obj = budgetList;
      delete obj[key];
      setBudgetList({ ...obj });
    }
  };

  //Modal
  const [showModal, setShowModal] = useState(false);
  const modalContents = () => {
    let textObj = "";
    let buttonObj = [
      {
        text: "확인",
        click: () => {
          setShowModal(!showModal);
        },
      },
    ];
    let total = 0;
    let zeroCheck = false;

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

    if (!utilityService.lengthZeroCheck(budgetList)) {
      Object.values(budgetList).map((value) => {
        if (value.cost === 0) {
          zeroCheck = true;
        }
        total += value.cost;
      });
    }

    if (monthBudget === 0) {
      //한달 고정 수입 작성 안했을때
      textObj = "한 달 고정 수입을 입력해주세요!";
    } else if (utilityService.lengthZeroCheck(budgetList)) {
      //예산 리스트가 없을 때(입력한 한달 고정 수입은 모두 저축으로 분류됨
      textObj =
        "한 달 예정 소비 목록이 없으면, 입력한 한 달 고정 수입은 전부 금융(저축)으로 분류되는데 괜찮으신가요?";
      buttonObj = [
        {
          text: "확인",
          click: () => {
            // setShowBudgetChart(!showBudgetChart);
            navigation.navigate("budgetReceipt", {
              receiptList: JSON.stringify(chartList),
              monthBudget: monthBudget,
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
      ];
    } else if (zeroCheck) {
      if (total === 0) {
        textObj = "예산 항목 리스트들 금액을 모두 입력해주세요!";
      } else {
        textObj =
          "예산 항목 리스트들 중, 금액이 입력안된 항목이 있어요! 입력해주세요 ;)";
      }
    } else if (total > monthBudget) {
      textObj =
        "한 달 고정 수입액보다 예산 리스트 항목 합산이 더 많아요..ㅠㅅㅠ \n이러면 마이너스인데 이대로 진행할까요?";
      buttonObj = [
        {
          text: "확인",
          click: () => {
            navigation.navigate("budgetReceipt", {
              receiptList: JSON.stringify(chartList),
              monthBudget: monthBudget,
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
      ];
    } else {
      textObj =
        "이대로 진행하면 될까요? 추가로 수정할 사항이 있다면, 취소 버튼을 누른 뒤 수정해주세요!";
      buttonObj = [
        {
          text: "확인",
          click: () => {
            navigation.navigate("budgetReceipt", {
              receiptList: JSON.stringify(chartList),
              monthBudget: monthBudget,
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
      ];
    }
    return { text: textObj, button: buttonObj };
  };

  //chart 보여주는 곳
  const [chartList, setChartList] = useState([]);

  const addExtraMoney = () => {
    let list = [];
    Object.values(budgetList).map((value) => {
      list.push({ name: value.name, cost: value.cost });
    });

    if (utilityService.lengthZeroCheck(list)) {
      list.push({
        name: "금융",
        cost: monthBudget,
      });
    }
    setChartList(list);
  };
  useEffect(() => {
    addExtraMoney();
  }, [budgetList, monthBudget]);

  return (
    <SafeAreaView style={styles.bodyContainer_safeArea}>
      <StatusBar style="auto" />
      <View style={styles.headContainer}>
        <Text style={styles.headText}>대~충 예산</Text>
      </View>
      <View style={styles.monthBudgetContainer}>
        <Text style={styles.bottomSheetHeaderText}>한 달 고정 수입</Text>
        <ListItem style={{ marginTop: 10 }}>
          <ListItem.Input
            // placeholder="숫자를 입력해주세요."
            inputMode="numeric"
            value={utilityService.addCommaText(monthBudget)}
            onChangeText={(value) => {
              onChangePoints(value);
            }}
            style={{
              fontFamily: "dunggeunmo",
              fontSize: 20,
              borderColor: "green",
              borderWidth: 2,
              borderRadius: 10,
              padding: 10,
            }}
          />
          <ListItem.Title style={{ fontFamily: "dunggeunmo", fontSize: 15 }}>
            원
          </ListItem.Title>
        </ListItem>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          type="plus"
          activeOpacity={0.7}
          style={{ width: 45, height: 45 }}
          onClick={() => {
            buttonHandler("open");
          }}
          key="open"
          disable={monthBudget === 0}
        />
        <Button
          type="reset"
          activeOpacity={0.7}
          style={{ width: 45, height: 45 }}
          onClick={() => {
            buttonHandler("reset");
          }}
          key="reset"
        />
      </View>
      <ScrollView style={styles.bodyContainer_scollArea}>
        <View>
          {!utilityService.lengthZeroCheck(budgetList) &&
            Object.entries(budgetList).map(([key, value]) => (
              <ListItem
                key={key}
                bottomDivider
                style={{ padding: 0, margin: 0 }}
              >
                <Image source={value.icon} style={{ width: 30, height: 30 }} />
                <ListItem.Content>
                  <ListItem.Title
                    style={{ fontFamily: "dunggeunmo", fontSize: 15 }}
                  >
                    {value.name}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Input
                  placeholder="0"
                  inputMode="numeric"
                  multiline
                  value={utilityService.addCommaText(value.cost)}
                  onChangeText={(value) => {
                    changeBudget(value, key, "add");
                  }}
                  style={{
                    fontFamily: "dunggeunmo",
                    fontSize: 15,
                    minHeight: 0,
                  }}
                />
                <ListItem.Title
                  style={{ fontFamily: "dunggeunmo", fontSize: 15 }}
                >
                  원
                </ListItem.Title>
                <Button
                  type={"cancel"}
                  onClick={(e) => {
                    changeBudget(e, key, "del");
                  }}
                />
              </ListItem>
            ))}
        </View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <Button
          text={"한 달 여유자금은~~?"}
          style={{
            paddingVertical: 10,
            width: "100%",
            alignItem: "center",
          }}
          size={25}
          fontStyle={styles.bottomButtonTextContainer}
          onClick={() => {
            setShowModal(!showModal);
          }}
          widthP={true}
        />
      </View>

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
