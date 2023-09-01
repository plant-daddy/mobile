import { Button, Input, Text, Title } from "@/components/global";
import { ScreenHeight, ScreenWidth } from "@/theme/dimension";
import { Link } from "expo-router";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SignIn() {
  return (
    <View
      style={{
        alignItems: "center",
        marginVertical: 64,
      }}
    >
      <Image
        source={require("../../assets/images/sign-in.png")}
        style={{
          maxHeight: ScreenHeight * 0.4,
        }}
        resizeMode="contain"
      />
      <View style={{ width: ScreenWidth - 64, gap: 12 }}>
        <Title>Login</Title>
        <Input placeholder="Email" style={{ padding: 8 }} />
        <Input secureTextEntry placeholder="Password" style={{ padding: 8 }} />
        <Button primary style={{ borderRadius: 4, padding: 16 }}>
          Login
        </Button>
        <Link href="/signup" asChild>
          <TouchableOpacity style={{ alignSelf: "center" }}>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
