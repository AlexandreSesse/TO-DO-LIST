import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function SummaryScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const storedName = await AsyncStorage.getItem("username");
      const storedTasks = await AsyncStorage.getItem("tasks");

      setUsername(storedName || "Usuário");
      setTasks(storedTasks ? JSON.parse(storedTasks) : []);
    };

    loadData();
  }, []);

  const toggleTaskCompletion = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);
    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <Container>
      <Text>Olá, {username}!</Text>
      <Text>Suas Tarefas:</Text>

      {"Essas são suas tarefas atuais"}
      {tasks.length === 0 ? (
        <Text>Nenhuma tarefa cadastrada.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <Text style={{ textDecorationLine: item.completed ? "line-through" : "none" }}>
                {item.completed ? "✅ " : "⬜ "} {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <Button title="Voltar" onPress={() => navigation.navigate("Form")} />
    </Container>
  );
}
