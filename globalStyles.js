import { StyleSheet } from "react-native";

export const colors = {
  primary: "#3498db",
  secondary: "#2ecc71",
  text: "#2c3e50",
};

export const globalStyles = StyleSheet.create({
  // Títulos
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text,
    marginVertical: 16,
    textAlign: "center",
  },

  // Subtítulos
  subtitle: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.text,

    textAlign: "center",
  },
  text:{
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
    marginVertical: 12
  },

  // Botones
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
    borderWidth:2,
    borderColor: "#3498db",
    margin:5
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },

  //menus
menuButton: {
  borderWidth: 2,
  borderRadius: 8,
  borderColor: "#3498db",
  width: "48%",
  height: 100,
  margin: "1%",
  padding:5,
  justifyContent: "center", // ✅ Opcional: centrar contenido
  alignItems: "center",     // ✅ Opcional: centrar contenido
},

//contenedores
container:{
    margin:10,
    
},
menuContainer:{
      width: "100%",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
},

  formInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
});