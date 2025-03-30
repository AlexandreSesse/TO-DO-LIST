import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default function SummaryScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [task, setTask] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const storedName = await AsyncStorage.getItem("username");
      const storedTask = await AsyncStorage.getItem("task");
      setUsername(storedName || "Usuário");
      setTask(storedTask || "Nenhuma tarefa cadastrada.");
    };
    loadData();
  }, []);

  return (
    <Container>
      <Text>Olá, {username}!</Text>
      <Text>Sua Tarefa: {task}</Text>
      <Button title="Voltar" onPress={() => navigation.navigate("Form")} />
    </Container>
  );
}
