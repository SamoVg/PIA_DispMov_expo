import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Inicio" }} />
      <Stack.Screen name="pasaLista" options={{ title: "Tomar fotografia" }} />
      <Stack.Screen
        name="grupoEspecifico"
        options={{ title: "Opciones del grupo" }}
      />
      <Stack.Screen
        name="registrarEstudiante"
        options={{ title: "Registrar Estudiante" }}
      />
      <Stack.Screen
        name="registrarCara"
        options={{ title: "Registrar Rostro de Estudiante" }}
      />
       <Stack.Screen
        name="estudiantesGrupo"
        options={{ title: "Ver Alumnos inscritos" }}
      />
             <Stack.Screen
        name="AsistenciasGrupo"
        options={{ title: "Ver Asistencias del grupo" }}
      />
    </Stack>
  );
}
