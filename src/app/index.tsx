import { useRouter } from "expo-router";
import { useEffect } from "react";
import Splash from "../core/components/spalsh";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // replace to the named route '/home' instead of a file path
      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return <Splash />;
}
