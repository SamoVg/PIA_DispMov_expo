/* eslint-disable react-hooks/rules-of-hooks */
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function pasaLista() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("front");
  const [mode, setMode] = useState<"picture" | "video">("picture"); // 🆕 Añade este estado

  //nombre del grupo desde la seleccion de grupo
  const { nombre } = useLocalSearchParams();

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Danos acceso a tu camara</Text>
        <Button onPress={requestPermission} title="Dar permiso" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync({
      quality: 0.8,
    });

    setUri(photo?.uri ?? null);

    if (photo?.uri) {
      try {
        const formData = new FormData();

        // Creamos correctamente el objeto del archivo
        const fileUri =
          Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri;
        const filename = fileUri.split("/").pop() || `photo.jpg`;

        formData.append("image", {
          uri: fileUri,
          type: "image/jpeg", // Asegúrate de que este tipo coincida con el formato de la imagen
          name: filename,
        } as any);

        console.log("Enviando formulario:", formData);

        const response = await fetch(
          `https://engaged-pup-nearby.ngrok-free.app/Asistencia/RegistrarAsistenciaHoy/${nombre}`,
          {
            method: "POST",
            headers: {
              // No incluimos Content-Type, dejamos que FormData establezca el boundary correcto
              Accept: "application/json",
            },
            body: formData,
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        if (data.success === true) {
          alert(data.message);
        } else {
          alert("Error: " + (data.message || "Respuesta inesperada"));
        }
      } catch (error) {
        console.error("Error completo:", error);
        alert("Error al procesar la imagen: " + error);
      }
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const renderPicture = () => {
    return (
      <View>
        <Image
          source={{ uri: uri ?? "" }}
          contentFit="contain"
          style={{ width: 300, aspectRatio: 1 }}
        />
        <Button onPress={() => setUri(null)} title="Volver a tomar asistencia" />
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        mode="picture" // 🚨 Fija el modo a picture
        facing={facing}
        mute={false}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.shutterContainer}>
          {/* Simplificamos el botón para solo fotos */}
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View style={[styles.shutterBtn, { opacity: pressed ? 0.5 : 1 }]}>
                <View
                  style={[styles.shutterBtnInner, { backgroundColor: "white" }]}
                />
              </View>
            )}
          </Pressable>

          <Pressable onPress={toggleFacing}>
            <FontAwesome6 name="rotate-left" size={32} color="white" />
          </Pressable>
        </View>
      </CameraView>
    );
  };
  return (
    <View style={styles.container}>
      {uri ? renderPicture() : renderCamera()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
