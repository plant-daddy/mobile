import React from "react";
import {
  TouchableHighlight,
  Text,
  TouchableHighlightProps,
  StyleSheet,
  TextStyle,
  StyleProp,
} from "react-native";
import { colors } from "../../theme";

type ButtonProps = TouchableHighlightProps & {
  children: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  primary?: boolean;
};

export const style = StyleSheet.create({
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

export function Button({ children, primary, textStyle, ...rest }: ButtonProps) {
  return (
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
}
