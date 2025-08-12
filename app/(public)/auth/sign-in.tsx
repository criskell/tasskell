import { useAuth } from "@/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "expo-router";
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

const signInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function SignInScreen() {
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSignIn: SubmitHandler<SignInSchema> = async (data) => {
    console.log("auth data", data);

    const response = await signIn(data);

    console.log("response", response);
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "Entrar",
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

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextInput
              {...field}
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <Button title="Entrar" onPress={handleSubmit(onSignIn)} />
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
