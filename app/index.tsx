import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/auth_store";

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const accessToken = useAuthStore((state) => state.accessToken);


  useEffect(() => {
    // Delay a tick to ensure layout is mounted
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isReady) {
      if (!accessToken) {
        router.replace("/login");
        return;
      }

      router.replace("/presentation/day_presentation");
    }
  }, [isReady]);

  return null;
}
