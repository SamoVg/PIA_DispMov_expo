/* eslint-disable react-hooks/rules-of-hooks */
import ModalSimple from "@/components/ModalSimple";
import { globalStyles } from "@/globalStyles";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function crearGrupo() {
  const [form, setForm] = useState({ nombre: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [respuesta, setRespuesta] = useState({status:""});

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const url = `https://engaged-pup-nearby.ngrok-free.app/Grupos/CrearGrupo?identificadorGrupo=${encodeURIComponent(form.nombre)}`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const data = await response.text();
      if (!response.ok) throw new Error(data || "Error en la solicitud");

      setRespuesta(JSON.parse(data));
      setModalVisible(true);
    } catch (error) {
      setRespuesta(error.msg);
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={[style.container]}>
      <Text style={[globalStyles.text]}>Nombre del grupo</Text>
      <TextInput
        style={[globalStyles.formInput]}
        placeholder="Ej: Alan"
        value={form.nombre}
        onChangeText={(text) => setForm({"nombre": text})}
      />
      <Pressable style={[globalStyles.button]} onPress={handleSubmit}>
        <Text>{isLoading ? "Cargando..." : "Crear Grupo"}</Text>
      </Pressable>

      <ModalSimple isOpen={modalVisible}>
        <View>
          <Text>Grupo Creado</Text>
        </View>
      </ModalSimple>
    </View>
  );
}

const style = StyleSheet.create({
  container:{
    margin:5
  }
})