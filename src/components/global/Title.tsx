import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { fonts, colors } from "../../theme";

interface TitleProps extends TextProps {
  children?: React.ReactNode;
  marginHorizontal?: number;
  marginTop?: number;
}

export const style = StyleSheet.create({
  title: {
    fontFamily: fonts.rubik700,
    color: colors.green.dark,
    fontSize: 24,
    textAlign: "center",
    margin: 10,
  },
});

export function Title({
  children,
  marginHorizontal,
  marginTop,
  ...rest
}: TitleProps) {
  const marginStyle = { marginHorizontal, marginTop };

  return (
    <Text {...rest} style={[style.title, marginStyle, rest.style]}>
      {children}
    </Text>
  );
}
