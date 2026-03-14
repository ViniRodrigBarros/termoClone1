import Keyboard from "@/core/components/keyboard";
import { palavras } from "@/core/utils/words";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Button, Text, View } from "react-native";
import TermoMatriz from "../../core/components/termoMatriz";
import { styles } from "./_styles";

export default function Home() {
  const [initialMatriz, setInitialMatriz] = useState<(string | null)[][]>([]);
  const [linhaAtual, setLinhaAtual] = useState<(string | null)[]>(
    Array(5).fill(null),
  );
  const [colunaAtual, setColunaAtual] = useState<number | null>(null);

  const palavra = useMemo(
    () => palavras[Math.floor(Math.random() * palavras.length)].toUpperCase(),
    [],
  );

  const appendMatriz = (novaLinha: (string | null)[]) => {
    setInitialMatriz((prevMatriz) => [...prevMatriz, novaLinha]);
  };
  const updateMatrizRow = (
    linhaIndex: number,
    novaLinha: (string | null)[],
  ) => {
    console.log("matriz inicial antes da atualização:", initialMatriz);
    const novaMatriz = [...initialMatriz];
    novaMatriz[linhaIndex] = novaLinha;
    console.log("Matriz atualizada:", novaMatriz);
    setInitialMatriz(novaMatriz);
  };

  const handleCellPress = (_linha: number, coluna: number) => {
    // only allow selecting in first row (index 0)
    setColunaAtual(coluna);
  };

  const handleKeyPress = (key: string) => {
    if (key === "ENTER") {
      if (linhaAtual.some((cell) => cell === null)) {
        // require all cells filled before submit
        return;
      }
      // submit current linhaAtual
      //updateMatrizRow(0, linhaAtual);
      setLinhaAtual(Array(5).fill(null));
      updateMatrizRow(0, linhaAtual);
      console.log("Linha submetida:", linhaAtual);

      setColunaAtual(+1);
      return;
    }
    if (colunaAtual === null) return; // require selection
    if (typeof key !== "string" || key.length !== 1) return;
    setLinhaAtual((prev) => {
      const nova = [...prev];
      nova[colunaAtual] = key;
      return nova;
    });
    setColunaAtual((prev) => (prev !== null && prev < 4 ? prev + 1 : null));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Bem-vindo ao Termo Clone!</Text>
      <Text style={styles.subtitle}>Sua tela principal</Text>

      <TermoMatriz
        matriz={initialMatriz}
        palavraAtual={palavra}
        linhaAtual={linhaAtual}
        colunaAtual={colunaAtual}
        onCellPress={handleCellPress}
      />

      <Button
        title="Adicionar Linha Teste"
        onPress={() => appendMatriz([null, "E", "S", "T", "E"])}
      />
      <View style={{ padding: 20 }}>
        <Keyboard onKeyPress={handleKeyPress} />
      </View>
    </View>
  );
}
