import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: true, tabBarActiveTintColor: "#386de5" }}
    >
      <Tabs.Screen
        name="signIn"
        options={{
          title: "Sign In",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="sign-in" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="signUp"
        options={{
          title: "Sign Up",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="registered" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
