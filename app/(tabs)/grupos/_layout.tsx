import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Grupos" }} />
      <Stack.Screen name="crearGrupo" options={{ title: "Crear un grupo" }} />
    </Stack>
  );
}
