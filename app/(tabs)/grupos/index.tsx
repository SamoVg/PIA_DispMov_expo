import MenuButton from "@/components/menuButton";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { globalStyles } from "../../../globalStyles";

export default function Grupos() {
  const [form, setForm] = useState({
    nombre: "",
    matricula: "",
  });

  const handleChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <View style={[styles.container]}>
      <Text style={[globalStyles.title]}>Informacion de Grupos</Text>

      <View style={[styles.otherContainer]}>
        <MenuButton title="Registrar Grupos" href={"/grupos/crearGrupo"}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 20,
  },
  link: {
    textDecorationLine: "underline",
    fontSize: 20,
  },
  formInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  otherContainer: {
    width: "100%",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
