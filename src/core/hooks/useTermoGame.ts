import { useMemo, useState } from "react";
import { GAME_CONFIG } from "../utils/constants";
import { criarMatrizVazia } from "../utils/gameHelpers";
import { palavras } from "../utils/words";

export type GameStatus = "playing" | "won" | "lost";

export function useTermoGame() {
  const palavra = useMemo(
    () => palavras[Math.floor(Math.random() * palavras.length)].toUpperCase(),
    [],
  );

  const [linhas, setLinhas] = useState<(string | null)[][]>(
    criarMatrizVazia(GAME_CONFIG.TOTAL_LINHAS, GAME_CONFIG.TOTAL_COLUNAS),
  );
  const [linhaAtualIndex, setLinhaAtualIndex] = useState<number>(0);
  const [colunaAtual, setColunaAtual] = useState<number | null>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");

  const handleCellPress = (linha: number, coluna: number) => {
    if (gameStatus !== "playing") return;
    if (linha === linhaAtualIndex) {
      setColunaAtual(coluna);
    }
  };

  const handleKeyPress = (key: string) => {
    if (gameStatus !== "playing") return;

    if (key === "ENTER") {
      if (linhas[linhaAtualIndex].some((cell) => cell === null)) {
        return;
      }

      const palavraDigitada = linhas[linhaAtualIndex].join("");

      if (linhaAtualIndex >= GAME_CONFIG.TOTAL_LINHAS - 1) {
        setGameStatus("lost");
        console.log("Fim de jogo! A palavra era:", palavra);
        return;
      }

      // Avança para próxima linha
      setLinhaAtualIndex(linhaAtualIndex + 1);
      setColunaAtual(0);

      if (palavraDigitada === palavra) {
        setGameStatus("won");
        console.log("Parabéns! Você acertou a palavra:", palavra);
        return;
      }

      console.log("Linha submetida:", palavraDigitada);
      console.log("Próxima linha:", linhaAtualIndex + 1);
      return;
    }

    // BACKSPACE - deletar letra
    if (key === "BACKSPACE") {
      if (colunaAtual === null) return;

      // Se a célula atual está vazia, volta para a anterior
      if (linhas[linhaAtualIndex][colunaAtual] === null && colunaAtual > 0) {
        const novaColunaAtual = colunaAtual - 1;
        setLinhas((prevLinhas) => {
          const novasLinhas = [...prevLinhas];
          const novaLinha = [...novasLinhas[linhaAtualIndex]];
          novaLinha[novaColunaAtual] = null;
          novasLinhas[linhaAtualIndex] = novaLinha;
          return novasLinhas;
        });
        setColunaAtual(novaColunaAtual);
      } else {
        // Deleta a letra atual
        setLinhas((prevLinhas) => {
          const novasLinhas = [...prevLinhas];
          const novaLinha = [...novasLinhas[linhaAtualIndex]];
          novaLinha[colunaAtual] = null;
          novasLinhas[linhaAtualIndex] = novaLinha;
          return novasLinhas;
        });
      }
      return;
    }

    // Letra normal
    if (colunaAtual === null) return;
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
    if (colunaAtual < GAME_CONFIG.TOTAL_COLUNAS - 1) {
      setColunaAtual(colunaAtual + 1);
    }
  };

  const resetGame = () => {
    setLinhas(
      criarMatrizVazia(GAME_CONFIG.TOTAL_LINHAS, GAME_CONFIG.TOTAL_COLUNAS),
    );
    setLinhaAtualIndex(0);
    setColunaAtual(0);
    setGameStatus("playing");
  };

  return {
    palavra,
    linhas,
    linhaAtualIndex,
    colunaAtual,
    gameStatus,
    handleCellPress,
    handleKeyPress,
    resetGame,
  };
}
