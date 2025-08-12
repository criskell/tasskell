import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen name="auth/sign-in" />
      <Stack.Screen name="auth/sign-up" />
    </Stack>
  );
}
