import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/stores/auth_store";

interface JwtPayload {
  userId: number;
  username: string;
  userRole: string;  
}

export const getCurrentUsername = (): string | null => {
  const token = useAuthStore.getState().accessToken;
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.username;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};
