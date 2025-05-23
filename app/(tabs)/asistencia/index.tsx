import MenuButton from "@/components/menuButton";
import { globalStyles } from "@/globalStyles";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
export default function Inicio() {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    fetch("https://engaged-pup-nearby.ngrok-free.app/Grupos/ObtenerTodosGrupos")
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
    <View style={[styles.mainContainer]}>
      <Text style={[globalStyles.title]}>Grupos</Text>

      <View style={[styles.menuContainer]}>
        {grupos.map((grupo, index) => (
          <MenuButton
            key={index}
            title={grupo}
            href={`/asistencia/grupoEspecifico?nombre=${grupo}`}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    margin: 30,
  },
  menuContainer: {
    width: "100%",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
