import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (name.trim()) {
      await AsyncStorage.setItem("username", name);
      navigation.navigate("Form");
    }
  };

  return (
    <Container>
      <Text>Digite seu nome:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          width: 200,
          margin: 10,
          padding: 5,
          borderRadius: 5,
        }}
        value={name}
        onChangeText={setName}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </Container>
  );
}
