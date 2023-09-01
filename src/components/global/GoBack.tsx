import { GoBackSVG } from "@/assets/svg/goBack";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native";

export const GoBack = () => (
  <TouchableOpacity onPress={() => router.back()}>
    <GoBackSVG />
  </TouchableOpacity>
);
