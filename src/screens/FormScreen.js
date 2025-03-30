import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function FormScreen({ navigation }) {
  const [task, setTask] = useState("");

  const handleSave = async () => {
    if (task.trim()) {
      await AsyncStorage.setItem("task", task);
      navigation.navigate("Summary");
    }
  };

  return (
    <Container>
      <Text>Digite sua tarefa:</Text>
      <TextInput
        style={{
          borderWidth: 1,
          width: 200,
          margin: 10,
          padding: 5,
          borderRadius: 5,
        }}
        value={task}
        onChangeText={setTask}
      />
      <Button title="Salvar" onPress={handleSave} />
    </Container>
  );
}
