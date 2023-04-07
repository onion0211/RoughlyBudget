import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bodyContainer_safeArea: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  headContainer: {
    justifyContent: "center",
    width: "100%",
  },
  headText: {
    flexWrap: "wrap",
    fontFamily: "OK_GUNG",
    fontSize: 60,
    textShadowColor: "green",
    textShadowRadius: 3,
    textShadowOffset: { width: 3, height: 3 },
  },
  monthBudgetContainer: {
    flexDirection: "column",
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  bodyContainer_scollArea: {
    width: "100%",
  },
  bottomButtonContainer: {
    width: "100%",
    bottom: 0,
    alignItems: "center",
  },
  bottomButtonTextContainer: {
    flexWrap: "wrap",
    fontFamily: "OK_GUNG",
    fontSize: 25,
    textShadowColor: "green",
    textShadowRadius: 3,
    textShadowOffset: { width: 2, height: 2 },
    width: "100%",
    textAlign: "center",
  },
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  bottomSheetHeader: {
    flex: 0.3,
    justifyContent: "center",
    alignSelf: "flex-start",
    paddingLeft: 15,
  },
  bottomSheetHeaderText: {
    fontFamily: "dunggeunmo",
    fontSize: 20,
  },
  bottomSheetBody: {
    flex: 1,
    width: "100%",
  },
  bottomSheetIconText: {
    fontFamily: "dunggeunmo",
    fontSize: 15,
  },
  bottomSheetIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    flex: 1,
    margin: 5,
  },
});
