import { globalStyles } from "@/globalStyles";
import { Link } from "expo-router"; // Importa Link de Expo Router
import { Text, TouchableOpacity } from "react-native";

export default function MenuButton({ title, href }) {
  return (
    <Link href={href} push asChild>
      {/* `asChild` permite personalizar el componente hijo */}
      <TouchableOpacity 
        style={globalStyles.menuButton}
        activeOpacity={0.7}
      >
        <Text style={globalStyles.subtitle}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );
}