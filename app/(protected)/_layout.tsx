import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="tasks"
        options={{
          title: "Tarefas",
        }}
      />
    </Stack>
  );
}
