import MenuButton from "@/components/menuButton";
import { globalStyles } from "@/globalStyles";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function GrupoEspecifico() {
  const { nombre } = useLocalSearchParams();

  return (
    <View style={{ padding: 20 }}>
      <View style={[globalStyles.menuContainer]}>
        <MenuButton
          title={"Tomar Asistencia"}
          href={`/asistencia/pasaLista?nombre=${nombre}`}
        ></MenuButton>
        <MenuButton
          title={"Registrar Estudiante"}
          href={`/asistencia/registrarEstudiante?nombre=${nombre}`}
        ></MenuButton>
        <MenuButton
          title={"Registrar Rostro"}
          href={`/asistencia/registrarCara?nombre=${nombre}`}
        ></MenuButton>
      </View>
    </View>
  );
}
