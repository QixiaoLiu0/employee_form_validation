import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { z } from "zod";

const signUpSchema = z
  .object({
    fullName: z.string().trim().min(1, "Full name is required"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "Must contain at least one letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const [isFullNamefocused, setIsFullNamefocused] = useState(false);
  const [isEmailfocused, setIsEmailfocused] = useState(false);
  const [isPwdfocused, setIsPwdfocused] = useState(false);
  const [isConfirmPwdfocused, setIsConfirmPwdfocused] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  function onSubmit(data: SignUpForm) {
    console.log(data);
    Alert.alert("passed");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Employee Sign-Up Form</Text>

      {/* Full name */}
      <Text style={styles.label}>Full name</Text>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.fullName && styles.inputError,
              isFullNamefocused && styles.inputFocused,
            ]}
            placeholder="e.g. Foo Bar"
            placeholderTextColor={"#ccc"}
            value={value}
            onChangeText={onChange}
            keyboardType="default"
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
            onFocus={() => setIsFullNamefocused(true)}
            onBlur={() => setIsFullNamefocused(false)}
          />
        )}
      />
      {errors.fullName && (
        <Text style={styles.error}>{errors.fullName.message}</Text>
      )}

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.email && styles.inputError,
              isEmailfocused && styles.inputFocused,
            ]}
            placeholder="e.g. foo.bar@example.com"
            placeholderTextColor={"#ccc"}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            textContentType="emailAddress"
            onFocus={() => setIsEmailfocused(true)}
            onBlur={() => setIsEmailfocused(false)}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.password && styles.inputError,
              isPwdfocused && styles.inputFocused,
            ]}
            placeholder="Enter a strong password"
            placeholderTextColor={"#ccc"}
            value={value}
            onChangeText={onChange}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            onFocus={() => setIsPwdfocused(true)}
            onBlur={() => setIsPwdfocused(false)}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {/* Confirm Password */}
      <Text style={styles.label}>Confirm Password</Text>
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              styles.input,
              errors.confirmPassword && styles.inputError,
              isConfirmPwdfocused && styles.inputFocused,
            ]}
            placeholder="Re-enter your password"
            placeholderTextColor={"#ccc"}
            value={value}
            onChangeText={onChange}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="newPassword"
            onFocus={() => setIsConfirmPwdfocused(true)}
            onBlur={() => setIsConfirmPwdfocused(false)}
          />
        )}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword.message}</Text>
      )}

      {/* Submit Button */}
      <Pressable
        disabled={!isValid}
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {},
  h1: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 14,
    fontSize: 16,
    color: "#000",
  },
  inputFocused: {
    borderColor: "#67b5fc",
    borderWidth: 2,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#f42b2b",
  },
  error: {
    color: "#f42b2b",
    fontSize: 13,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#67b5fc",
    borderRadius: 6,
    padding: 16,
    alignItems: "center",
    marginTop: 28,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonDisabled: { backgroundColor: "#c2c2c2", opacity: 0.6 },
});
