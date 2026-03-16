import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GAME_CONFIG } from "../utils/constants";
import blockColor, { Estado } from "../utils/enums";
import { getBlockColor } from "../utils/gameHelpers";

const { width } = Dimensions.get("window");

interface LinhaProps {
  letras: (string | null)[];
  estado: Estado;
  colunaAtual: number | null;
  palavraCorreta: string;
  onCellPress: (coluna: number) => void;
}

function Linha({
  letras,
  estado,
  colunaAtual,
  palavraCorreta,
  onCellPress,
}: LinhaProps) {
  return (
    <View style={styles.linha}>
      {Array.from({ length: GAME_CONFIG.TOTAL_COLUNAS }).map(
        (_, colunaIndex) => {
          const letra = letras[colunaIndex];
          const isSelected =
            estado === Estado.editing && colunaAtual === colunaIndex;

          const color =
            estado === Estado.submitted && palavraCorreta && letra
              ? getBlockColor(colunaIndex, palavraCorreta, letra)
              : null;

          const cellStyle = [
            styles.quadrado,
            {
              backgroundColor: color ?? "#ffffff4d",
              borderColor: isSelected
                ? "#545454"
                : color
                  ? color === blockColor.preto
                    ? "#d3d6da"
                    : color
                  : "#d3d6da",
              borderWidth: isSelected ? 3 : 2,
            },
          ];

          const cellContent = (
            <Text style={[styles.letra, { color: "#ffffff" }]}>
              {letra ? letra.toUpperCase() : ""}
            </Text>
          );

          if (estado === Estado.editing) {
            return (
              <TouchableOpacity
                key={colunaIndex}
                style={cellStyle}
                activeOpacity={0.7}
                onPress={() => onCellPress(colunaIndex)}
              >
                {cellContent}
              </TouchableOpacity>
            );
          }

          return (
            <View key={colunaIndex} style={cellStyle}>
              {cellContent}
            </View>
          );
        },
      )}
    </View>
  );
}

interface TermoMatrizProps {
  linhas: (string | null)[][];
  linhaAtualIndex: number;
  colunaAtual: number | null;
  palavraCorreta: string;
  onCellPress: (linha: number, coluna: number) => void;
}

export default function TermoMatriz({
  linhas,
  linhaAtualIndex,
  colunaAtual,
  palavraCorreta,
  onCellPress,
}: TermoMatrizProps) {
  // Garante sempre 6 linhas
  const linhasCompletas: (string | null)[][] = [
    ...linhas,
    ...Array.from({ length: GAME_CONFIG.TOTAL_LINHAS - linhas.length }, () =>
      Array(GAME_CONFIG.TOTAL_COLUNAS).fill(null),
    ),
  ].slice(0, GAME_CONFIG.TOTAL_LINHAS);

  return (
    <View style={styles.container}>
      {linhasCompletas.map((letras, linhaIndex) => {
        let estado: Estado;
        if (linhaIndex === linhaAtualIndex) {
          estado = Estado.editing;
        } else if (linhaIndex < linhaAtualIndex) {
          estado = Estado.submitted;
        } else {
          estado = Estado.default;
        }

        return (
          <Linha
            key={linhaIndex}
            letras={letras}
            estado={estado}
            colunaAtual={linhaIndex === linhaAtualIndex ? colunaAtual : null}
            palavraCorreta={palavraCorreta}
            onCellPress={(coluna) => onCellPress(linhaIndex, coluna)}
          />
        );
      })}
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
    borderRadius: 4,
  },
  letra: {
    fontSize: TAMANHO_QUADRADO * 0.5,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
