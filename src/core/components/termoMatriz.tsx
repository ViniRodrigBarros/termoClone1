import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import blockColor from "../utils/enums";

const { width } = Dimensions.get("window");

interface TermoMatrizProps {
  matriz: (string | null)[][];
  palavraAtual?: string;
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
}: TermoMatrizProps) {
  // Cria a grade completa (6x5) e preenche com os valores da matriz
  const gradeCompleta = Array.from(
    { length: TOTAL_LINHAS },
    (_, linhaIndex) => {
      const linhaMatriz = matriz[linhaIndex] || [];
      return Array.from({ length: TOTAL_COLUNAS }, (_, colunaIndex) => {
        return linhaMatriz[colunaIndex] || null;
      });
    },
  );

  console.log("palavra:", palavraAtual);
  console.log("Grade Completa:", gradeCompleta);

  return (
    <View style={styles.container}>
      {gradeCompleta.map((linha, linhaIndex) => (
        <View key={linhaIndex} style={styles.linha}>
          {linha.map((letra, colunaIndex) => {
            console.log(
              `Processando letra: ${letra} na posição [${linhaIndex}, ${colunaIndex}]`,
            );
            const color =
              palavraAtual && letra
                ? getBlockColor(colunaIndex, palavraAtual, letra)
                : null;
            const textColor = !color
              ? "#000000"
              : color === blockColor.amarelo
                ? "#000000"
                : "#ffffff";

            return (
              <View
                key={`${linhaIndex}-${colunaIndex}`}
                style={[
                  styles.quadrado,
                  {
                    backgroundColor: color ?? "#ffffff",
                    borderColor: color
                      ? color === blockColor.preto
                        ? "#d3d6da"
                        : color
                      : "#d3d6da",
                  },
                ]}
              >
                <Text style={[styles.letra, { color: textColor }]}>
                  {" "}
                  {letra ? letra.toUpperCase() : ""}{" "}
                </Text>
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
