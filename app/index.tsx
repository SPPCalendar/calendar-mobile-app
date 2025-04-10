import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Delay a tick to ensure layout is mounted
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isReady) {
      router.replace("/presentation/day_presentation");
    }
  }, [isReady]);

  return null;
}
