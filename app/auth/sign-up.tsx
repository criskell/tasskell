import { auth } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
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

const signUpSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSignUp: SubmitHandler<SignUpSchema> = async (data) => {
    console.log("auth data", data);

    const response = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    console.log("response", response);
  };

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "Registrar Conta",
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
            <TextInput {...field} style={styles.input} placeholder="Senha" />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <Button title="Registrar" onPress={handleSubmit(onSignUp)} />
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
