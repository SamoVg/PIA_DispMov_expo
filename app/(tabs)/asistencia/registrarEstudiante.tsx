/* eslint-disable react-hooks/rules-of-hooks */
import ModalSimple from "@/components/ModalSimple";
import { globalStyles } from "@/globalStyles";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
const registrarEstudiante = () => {
  //nombre del grupo desde la seleccion de grupo
  const { nombre } = useLocalSearchParams();


  const [open, setIsopen] = useState(false);
  const [form, setForm] = useState({
    nombres: "",
    matricula: 0,
    apellidos: "",
  });

  const handleChange = (name: string, value: string | number) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(JSON.stringify(form))
    console.log("nombre del grupo ->" + nombre)
    fetch(
      `https://engaged-pup-nearby.ngrok-free.app/Grupos/registrarAlumnoDatos/${nombre}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    )
      .then((res) => res.json())
      .then((data) => {

        console.log("Respuesta de la API:", data);
        setIsopen(true);

      })
      .catch((error) => {
        console.error("Error al enviar datos:", error);
      });
  };

  return (
    <View style={[globalStyles.container]}>
      <Text style={[globalStyles.text]}>Nombre</Text>
      <TextInput
        style={[globalStyles.formInput]}
        placeholder="Ej: Alan"
        value={form.nombres}
        onChangeText={(value) => handleChange("nombres", value)}
      />
      <Text style={[globalStyles.text]}>Apellidos</Text>
      <TextInput
        style={[globalStyles.formInput]}
        placeholder="Ej: Vega Guerrero"
        value={form.apellidos}
        onChangeText={(value) => handleChange("apellidos", value)}
      />
      <Text style={[globalStyles.text]}>Matricula</Text>
      <TextInput
        style={globalStyles.formInput}
        placeholder="Matrícula"
        keyboardType="numeric" 
        value={String(form.matricula)}
        onChangeText={(value) =>
          handleChange("matricula", parseInt(value) || 0)
        }
      />
      <Pressable style={[globalStyles.button]} onPress={handleSubmit}>
        <Text>Registrar Estudiante</Text>
      </Pressable>
      <ModalSimple isOpen={open}>
        <Text>Se ha registrado exitosamente el estudiante</Text>
      </ModalSimple>
    </View>
  );
};

export default registrarEstudiante;
