import { colors } from "@/theme";
import { Href, Link, router } from "expo-router";
import React from "react";
import {
  TouchableHighlight,
  Text,
  TouchableHighlightProps,
  StyleSheet,
  TextStyle,
  StyleProp,
} from "react-native";

type ButtonProps = TouchableHighlightProps & {
  children: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  primary?: boolean;
  href?: Href<string>;
};

const style = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: colors.green.light,
  },
  primaryText: {
    color: colors.white.primary,
  },
  linkText: {
    color: colors.green.dark,
    textDecorationLine: "underline",
  },
});

export const Button = ({
  children,
  primary,
  textStyle,
  href,
  ...rest
}: ButtonProps) => (
  <TouchableHighlight
    {...rest}
    style={[
      style.button,
      { ...(primary && style["primary"]), ...(rest.style as Object) },
    ]}
  >
    <Text style={[style.primaryText]}>{children}</Text>
  </TouchableHighlight>
);
