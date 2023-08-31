import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export { ErrorBoundary } from "expo-router";

import {
  Rubik_300Light,
  Rubik_400Regular,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";

export const unstable_settings = {
  initialRouteName: "(carousel)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(carousel)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
