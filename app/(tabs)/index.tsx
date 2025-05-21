import { Collapsible } from "@/components/Collapsible";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const biometrics = () => {
  return (
    <View style={styles.container}>
      <Text>biometrics</Text>
      <Collapsible title="titulo">
        <Text>una lista </Text>
      </Collapsible>
    <Text>PRUEB </Text>
       
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
    justifyContent: 'flex-start'

    },
link:{
    textDecorationLine: "underline",
    fontSize:20
}
})

export default biometrics;
