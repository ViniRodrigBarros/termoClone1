import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSplashViewModel } from "./viewmodel";

const Splash: React.FC = () => {
  const { initialize } = useSplashViewModel();

  useEffect(() => {
    initialize();
  }, []);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff00",
  },
});

export default Splash;
