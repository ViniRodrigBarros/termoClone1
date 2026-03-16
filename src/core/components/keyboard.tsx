import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type KeyboardProps = {
  onKeyPress: (key: string) => void;
};

const ROWS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const { width } = Dimensions.get("window");
const KEY_MARGIN = 3;
const KEYS_PER_ROW = 10;
const KEY_WIDTH = Math.floor(
  (width - KEY_MARGIN * KEYS_PER_ROW * 2 - 16) / KEYS_PER_ROW,
);
const KEY_HEIGHT = KEY_WIDTH * 1.4;

export default function Keyboard({ onKeyPress }: KeyboardProps) {
  return (
    <View style={styles.container}>
      {ROWS.map((row, rIdx) => (
        <View key={rIdx} style={styles.row}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              activeOpacity={0.6}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.key, styles.specialKey]}
          activeOpacity={0.6}
          onPress={() => onKeyPress("BACKSPACE")}
        >
          <Text style={[styles.keyText, styles.actionText]}>⌫</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.key, styles.enterKey]}
          activeOpacity={0.6}
          onPress={() => onKeyPress("ENTER")}
        >
          <Text style={[styles.keyText, styles.actionText]}>ENTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
    justifyContent: "center",
  },
  key: {
    width: KEY_WIDTH,
    height: KEY_HEIGHT,
    marginHorizontal: KEY_MARGIN,
    borderRadius: 6,
    backgroundColor: "#d3d6da",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  keyText: {
    fontSize: KEY_WIDTH * 0.45,
    fontWeight: "700",
    color: "#1a1a2e",
  },
  enterKey: {
    width: KEY_WIDTH * 1.8,
    backgroundColor: "#538d4e",
  },
  specialKey: {
    width: KEY_WIDTH * 1.8,
    backgroundColor: "#b59f3b",
    marginRight: KEY_MARGIN * 2,
  },
  actionText: {
    color: "#ffffff",
    fontSize: KEY_WIDTH * 0.4,
  },
});
