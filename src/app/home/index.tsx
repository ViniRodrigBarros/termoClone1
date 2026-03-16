import Keyboard from "@/core/components/keyboard";
import { useTermoGame } from "@/core/hooks/useTermoGame";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import TermoMatriz from "../../core/components/termoMatriz";
import { styles } from "./_styles";

export default function Home() {
  const {
    palavra,
    linhas,
    linhaAtualIndex,
    colunaAtual,
    gameStatus,
    handleCellPress,
    handleKeyPress,
    resetGame,
  } = useTermoGame();

  console.log("Palavra selecionada:", palavra);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Bem-vindo ao Termo Clone!</Text>
      <Text style={styles.subtitle}>
        {gameStatus === "won"
          ? "🎉 Parabéns! Você acertou!"
          : gameStatus === "lost"
            ? `😢 Fim de jogo! A palavra era: ${palavra}`
            : ""}
      </Text>

      <TermoMatriz
        linhas={linhas}
        linhaAtualIndex={linhaAtualIndex}
        colunaAtual={colunaAtual}
        palavraCorreta={palavra}
        onCellPress={handleCellPress}
      />

      <View style={styles.keyboardContainer}>
        <Keyboard onKeyPress={handleKeyPress} />
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>↺ Reiniciar</Text>
      </TouchableOpacity>
    </View>
  );
}
