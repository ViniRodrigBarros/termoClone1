import blockColor from "./enums";

export function getBlockColor(
  columIndx: number,
  palavra: string,
  letter: string | null,
): blockColor | null {
  if (letter === null) {
    return null;
  }
  if (palavra[columIndx] === letter) {
    return blockColor.verde;
  }
  if (palavra.includes(letter)) {
    return blockColor.amarelo;
  }
  return blockColor.preto;
}

export function criarLinhaVazia(tamanho: number): (string | null)[] {
  return Array(tamanho).fill(null);
}

export function criarMatrizVazia(
  linhas: number,
  colunas: number,
): (string | null)[][] {
  return Array.from({ length: linhas }, () => criarLinhaVazia(colunas));
}
