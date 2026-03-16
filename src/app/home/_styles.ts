import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#505053",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 4,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3c",
    paddingBottom: 10,
    width: width,
    textAlignVertical: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    minHeight: 20,
  },
  keyboardContainer: {
    width: "100%",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#538d4e",
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 4,
  },
  resetButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 1,
  },
});
