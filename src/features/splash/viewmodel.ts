import { SplashViewModel } from "./model";

export const useSplashViewModel = (): SplashViewModel => {
  const initialize = async (): Promise<void> => {
    try {
      console.log("Iniciando aplicação...");

      // Simula carregamento de recursos
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Aplicação iniciada com sucesso!");
    } catch (error) {
      console.error("Erro ao inicializar:", error);
    }
  };

  return {
    initialize,
  };
};
