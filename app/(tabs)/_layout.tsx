import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="asistencia"
        options={{
          title: "Asistencias",
          headerShown: false, 
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="grupos"
        options={{
          title: "Grupos",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "school" : "school-outline"}
              size={30}
              color={color}
            />
          ),
        }}
      />


    </Tabs>
  );
};

export default RootLayout;
