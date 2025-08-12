import { useUser } from "@/providers/auth";
import { SafeAreaView, Text, View } from "react-native";

export default function TaskListScreen() {
  const user = useUser();

  return (
    <SafeAreaView>
      <View>
        <Text>Olá, usuário com e-mail {user.email}!</Text>
      </View>
    </SafeAreaView>
  );
}
