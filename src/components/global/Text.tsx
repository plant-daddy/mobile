import { colors, fonts } from "@/theme";
import React from "react";
import {
  Text as NativeText,
  TextProps as NativeTextProps,
  StyleSheet,
} from "react-native";

interface TextProps extends NativeTextProps {
  children: React.ReactNode;
}

const style = StyleSheet.create({
  text: {
    fontFamily: fonts.rubik300,
    color: colors.green.dark,
    fontSize: 14,
    textAlign: "justify",
    margin: 10,
    marginBottom: 2,
  },
});

export const Text = ({ children, ...rest }: TextProps) => (
  <NativeText {...rest} style={[style.text, rest.style]}>
    {children}
  </NativeText>
);
