import React from "react";
import {
  Text as NativeText,
  TextProps as NativeTextProps,
  StyleSheet,
} from "react-native";
import { colors, fonts } from "../../theme";

interface TextProps extends NativeTextProps {
  children: React.ReactNode;
  marginHorizontal?: number;
}

export const style = StyleSheet.create({
  text: {
    fontFamily: fonts.rubik300,
    color: colors.green.dark,
    fontSize: 14,
    textAlign: "justify",
    margin: 10,
    marginBottom: 2,
  },
});

export function Text({ children, marginHorizontal, ...rest }: TextProps) {
  const marginStyle = { marginHorizontal };

  return (
    <NativeText {...rest} style={[style.text, marginStyle, rest.style]}>
      {children}
    </NativeText>
  );
}
