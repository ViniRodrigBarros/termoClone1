import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type KeyboardProps = {
  onKeyPress: (key: string) => void;
};

const ROWS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export default function Keyboard({ onKeyPress }: KeyboardProps) {
  return (
    <View style={styles.container}>
      {ROWS.map((row, rIdx) => (
        <View key={rIdx} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              activeOpacity={0.7}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.key, styles.enterKey]}
          activeOpacity={0.7}
          onPress={() => onKeyPress("ENTER")}
        >
          <Text style={[styles.keyText, styles.enterText]}>ENTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  key: {
    minWidth: 36,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: "#e6e6e6",
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  enterKey: {
    backgroundColor: "#4caf50",
    minWidth: 64,
  },
  enterText: {
    color: "#fff",
    fontWeight: "700",
  },
});
