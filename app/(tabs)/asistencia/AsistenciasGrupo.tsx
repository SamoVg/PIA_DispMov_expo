import { globalStyles } from '@/globalStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const AsistenciasGrupo = () => {
  const { nombre } = useLocalSearchParams();
  const [grupos, setGrupos] = useState([]);
  const [fecha, setFecha] = useState("");
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [esValida, setEsValida] = useState(true);

  const validarFecha = (valor: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    setEsValida(regex.test(valor));
    setFecha(valor);
  };

  const formatearFecha = (date: Date) => {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const manejarCambioFecha = (_: any, selectedDate?: Date) => {
    setMostrarPicker(false);
    if (selectedDate) {
      const fechaFormateada = formatearFecha(selectedDate);
      validarFecha(fechaFormateada);
    }
  };

  useEffect(() => {
    if (!fecha || !esValida || !nombre) return;

    fetch(
      `https://engaged-pup-nearby.ngrok-free.app/Asistencia/ObtenerAsistencias/${nombre}?fecha=${fecha}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los grupos");
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setGrupos(data.data);
      })
      .catch((error) => {
        console.error("Error al cargar grupos:", error);
      });
  }, [fecha]);

  return (
    <View style={styles.container}>
      <Text style={styles.maintitle}>Seleccione una Fecha</Text>

      <Text style={styles.label}>Fecha (YYYY-MM-DD):</Text>

      <TextInput
        value={fecha}
        onChangeText={validarFecha}
        placeholder="2025-05-23"
        style={[styles.input, !esValida && styles.inputError]}
        keyboardType="numeric"
      />

      <Pressable style={[globalStyles.button]} onPress={() => setMostrarPicker(true)}>
        <Text>Seleccionar Fecha</Text>
      </Pressable>
      {mostrarPicker && (
        <DateTimePicker
          value={fecha ? new Date(fecha) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={manejarCambioFecha}
        />
      )}

      {!esValida && (
        <Text style={styles.error}>Formato inválido. Usa YYYY-MM-DD.</Text>
      )}

            <View style={styles.list}>
              {grupos.map((grupo) => (
                <Text key={grupo.idAlumno} style={[styles.listElement]}>
                  {" "}
                  - {grupo.nombres} {grupo.apellidos}
                </Text>
              ))}
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
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
  maintitle:{
    fontSize: 24,
    marginVertical:15,
    fontWeight: 600

  }
 
});

export default AsistenciasGrupo;
