import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/contexts/AuthContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen
          name="auth/login"
          options={{
            headerShown: false,
            title: "ავტორიზაცია",
          }}
        />
        <Stack.Screen
          name="auth/register"
          options={{
            headerShown: false,
            title: "რეგისტრაცია",
          }}
        />
        <Stack.Screen
          name="auth/passwordReset"
          options={{
            headerShown: true,
            title: "პაროლის აღდგენა",
            headerTintColor: "#000",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="qvevri/[id]"
          options={{
            title: "ქვევრი",
            headerShown: true,
            headerTintColor: "#000",
            headerBackTitleVisible: false,
            headerBackTitle: "მთავარი",
          }}
        />
        <Stack.Screen
          name="addQvevri"
          options={{
            headerShown: true,
            title: "ქვევრის დამატება",
            headerTintColor: "#000",
            headerBackTitle: "მთავარი",
            headerBackTitleVisible: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
