/* eslint-disable react-hooks/rules-of-hooks */
import { globalStyles } from "@/globalStyles";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function estudiantesGrupo() {
  const [grupos, setGrupos] = useState([]);
  const { nombre } = useLocalSearchParams();

  useEffect(() => {
    fetch(
      `https://engaged-pup-nearby.ngrok-free.app/Grupos/ObtenerAlumnosGrupo/${nombre}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los grupos");
        return res.json(); // convierte la respuesta a JSON
      })
      .then((data) => {
        setGrupos(data.data); // actualiza el estado con los grupos
      })
      .catch((error) => {
        console.error("Error al cargar grupos:", error);
      });
  }, []);

  return (
    <View>
      <Text style={[globalStyles.title]}>Grupos</Text>

      <View style={style.list}>
        {grupos.map((grupo) => (
          <Text key={grupo.idAlumno} style={[style.listElement]}>
            {" "}
            - {grupo.nombres} {grupo.apellidos}
          </Text>
        ))}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  list: {
    padding: 10,
  },
  listElement: {
    borderWidth: 2,
    padding:10,
    borderRadius:8,
    borderColor: "#b8b8b8",
    marginVertical: 5,
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
  },
});
