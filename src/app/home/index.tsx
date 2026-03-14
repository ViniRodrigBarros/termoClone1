import Keyboard from "@/core/components/keyboard";
import { palavras } from "@/core/utils/words";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { Button, Text, View } from "react-native";
import TermoMatriz from "../../core/components/termoMatriz";
import { styles } from "./_styles";

export default function Home() {
  const [initialMatriz, setInitialMatriz] = useState<(string | null)[][]>([]);

  const palavra = useMemo(
    () => palavras[Math.floor(Math.random() * palavras.length)].toUpperCase(),
    [],
  );

  const appendMatriz = (novaLinha: (string | null)[]) => {
    setInitialMatriz((prevMatriz) => [...prevMatriz, novaLinha]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Bem-vindo ao Termo Clone!</Text>
      <Text style={styles.subtitle}>Sua tela principal</Text>

      <TermoMatriz matriz={initialMatriz} palavraAtual={palavra} />

      <Button
        title="Adicionar Linha Teste"
        onPress={() => appendMatriz([null, "E", "S", "T", "E"])}
      />
      <View style={{ padding: 20 }}>
        <Keyboard onKeyPress={(key) => console.log("Key Pressed:", key)} />
      </View>
    </View>
  );
}
