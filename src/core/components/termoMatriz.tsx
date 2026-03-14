import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import blockColor from "../utils/enums";

const { width } = Dimensions.get("window");

interface TermoMatrizProps {
  matriz: (string | null)[][];
  palavraAtual?: string;
  linhaAtual?: (string | null)[];
  colunaAtual?: number | null;
  onCellPress?: (linha: number, coluna: number) => void;
}

export function getBlockColor(
  columIndx: number,
  palavra: string,
  letter: string | null,
): blockColor | null {
  if (letter === null) {
    return null;
  }
  if (palavra[columIndx] == letter) {
    return blockColor.verde;
  }
  if (palavra.includes(letter)) {
    return blockColor.amarelo;
  }
  return blockColor.preto;
}

const TOTAL_LINHAS = 6;
const TOTAL_COLUNAS = 5;

export default function TermoMatriz({
  matriz,
  palavraAtual,
  linhaAtual,
  colunaAtual,
  onCellPress,
}: TermoMatrizProps) {
  // primeira linha é a linha editável (linha 0)
  const linhaEmEdicao = 0;

  const gradeCompleta = Array.from(
    { length: TOTAL_LINHAS },
    (_, linhaIndex) => {
      if (linhaIndex === 0) {
        const fonte =
          linhaAtual ?? matriz[0] ?? Array(TOTAL_COLUNAS).fill(null);
        return Array.from(
          { length: TOTAL_COLUNAS },
          (_, colunaIndex) => fonte[colunaIndex] ?? null,
        );
      }
      const fonte = matriz[linhaIndex - 1] || [];
      return Array.from(
        { length: TOTAL_COLUNAS },
        (_, colunaIndex) => fonte[colunaIndex] ?? null,
      );
    },
  );

  console.log("palavra:", palavraAtual);
  console.log("Grade Completa:", gradeCompleta);

  return (
    <View style={styles.container}>
      {gradeCompleta.map((linha, linhaIndex) => (
        <View key={linhaIndex} style={styles.linha}>
          {linha.map((letra, colunaIndex) => {
            const isEditingRow = linhaIndex === linhaEmEdicao;
            const isSubmittedRow =
              linhaIndex > 0 && matriz[linhaIndex - 1] !== undefined;
            const isSelected = isEditingRow && colunaAtual === colunaIndex;

            const color =
              isSubmittedRow && palavraAtual && letra
                ? getBlockColor(colunaIndex, palavraAtual, letra)
                : null;
            const textColor = !color
              ? "#000000"
              : color === blockColor.amarelo
                ? "#000000"
                : "#ffffff";

            const cellStyle = [
              styles.quadrado,
              {
                backgroundColor: color ?? "#ffffff",
                borderColor: isSelected
                  ? "#6ca0dc"
                  : color
                    ? color === blockColor.preto
                      ? "#d3d6da"
                      : color
                    : "#d3d6da",
                borderWidth: isSelected ? 3 : 2,
              },
            ];

            const cellContent = (
              <Text style={[styles.letra, { color: textColor }]}>
                {letra ? letra.toUpperCase() : ""}
              </Text>
            );

            if (isEditingRow && onCellPress) {
              return (
                <TouchableOpacity
                  key={`${linhaIndex}-${colunaIndex}`}
                  style={cellStyle}
                  activeOpacity={0.7}
                  onPress={() => onCellPress(linhaIndex, colunaIndex)}
                >
                  {cellContent}
                </TouchableOpacity>
              );
            }

            return (
              <View key={`${linhaIndex}-${colunaIndex}`} style={cellStyle}>
                {cellContent}
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const TAMANHO_QUADRADO = Math.min(width * 0.15, 60);
const ESPACAMENTO = 8;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: ESPACAMENTO,
  },
  linha: {
    flexDirection: "row",
    gap: ESPACAMENTO,
  },
  quadrado: {
    width: TAMANHO_QUADRADO,
    height: TAMANHO_QUADRADO,
    borderWidth: 2,
    borderColor: "#d3d6da",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  letra: {
    fontSize: TAMANHO_QUADRADO * 0.5,
    fontWeight: "bold",
    color: "#000000",
  },
});
