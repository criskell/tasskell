import { useAuth } from "@/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, Stack } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as z from "zod";

const resetPasswordSchema = z.object({
  email: z.string(),
});

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordScreen() {
  const { resetPassword } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSignIn: SubmitHandler<ResetPasswordSchema> = async (data) => {
    console.log("reset password data", data);

    const response = await resetPassword(data.email);

    console.log("response", response);
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "Resetar senha",
        }}
      />

      <View style={styles.container}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput {...field} style={styles.input} placeholder="E-mail" />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
        <Button title="Resetar senha" onPress={handleSubmit(onSignIn)} />
        <Link href="/auth/sign-in">Entrar</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
