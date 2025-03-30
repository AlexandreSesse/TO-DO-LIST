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
      const storedTasks = await AsyncStorage.getItem("tasks");
      const taskList = storedTasks ? JSON.parse(storedTasks) : [];
      const newTask = {
        id: Date.now().toString(),
        title: task,
        completed: false,
      };

      const updatedTasks = [...taskList, newTask];
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));

      setTask("");

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
      <Button title="Ver Tarefas" onPress={() => navigation.navigate("Summary")} />
    </Container>
  );
}
