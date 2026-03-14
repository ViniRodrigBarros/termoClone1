import Keyboard from "@/core/components/keyboard";
import { palavras } from "@/core/utils/words";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import TermoMatriz from "../../core/components/termoMatriz";
import { styles } from "./_styles";

export default function Home() {
  const palavra = useMemo(
    () => palavras[Math.floor(Math.random() * palavras.length)].toUpperCase(),
    [],
  );
  console.log("Palavra selecionada:", palavra);

  const [linhaAtualIndex, setLinhaAtualIndex] = useState<number>(0);
  const [colunaAtual, setColunaAtual] = useState<number | null>(null);

  const [linhas, setLinhas] = useState<(string | null)[][]>([
    Array(5).fill(null),
    Array(5).fill(null),
    Array(5).fill(null),
    Array(5).fill(null),
    Array(5).fill(null),
    Array(5).fill(null),
  ]);

  const handleCellPress = (linha: number, coluna: number) => {
    if (linha === linhaAtualIndex) {
      setColunaAtual(coluna);
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "ENTER") {
      if (linhas[linhaAtualIndex].some((cell) => cell === null)) {
        return;
      }

      // Avança para próxima linha se não for a última
      if (linhaAtualIndex < 5) {
        setLinhaAtualIndex(linhaAtualIndex + 1);
        setColunaAtual(0); // Seleciona a primeira coluna da próxima linha
      }

      if (linhas[linhaAtualIndex].join("") == palavra) {
        console.log("Parabéns! Você acertou a palavra:", palavra);
        return;
      }

      console.log("Linha submetida:", linhas[linhaAtualIndex]);
      console.log("Próxima linha:", linhaAtualIndex + 1);

      return;
    }

    if (colunaAtual === null) return; // Requer seleção
    if (typeof key !== "string" || key.length !== 1) return;

    // Atualiza a letra na posição atual
    setLinhas((prevLinhas) => {
      const novasLinhas = [...prevLinhas];
      const novaLinha = [...novasLinhas[linhaAtualIndex]];
      novaLinha[colunaAtual] = key;
      novasLinhas[linhaAtualIndex] = novaLinha;
      return novasLinhas;
    });

    // Avança para próxima coluna
    setColunaAtual((prev) => (prev !== null && prev < 4 ? prev + 1 : prev));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Bem-vindo ao Termo Clone!</Text>
      <Text style={styles.subtitle}>Sua tela principal</Text>

      <TermoMatriz
        linhas={linhas}
        linhaAtualIndex={linhaAtualIndex}
        colunaAtual={colunaAtual}
        palavraCorreta={palavra}
        onCellPress={handleCellPress}
      />

      <View style={{ padding: 20 }}>
        <Keyboard onKeyPress={handleKeyPress} />
      </View>
    </View>
  );
}
