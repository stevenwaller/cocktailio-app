import { StyleSheet, ScrollView } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontFamily: "SchotisBlack" }}>
          SchotisBlack
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "SchotisBlackItalic" }}>
          SchotisBlackItalic
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "SchotisBold" }}>
          SchotisBold
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "SchotisBoldItalic" }}>
          SchotisBoldItalic
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "SchotisBook" }}>
          SchotisBook
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "SchotisBookItalic" }}>
          SchotisBookItalic
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "SchotisHeavy" }}>
          SchotisHeavy
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "SchotisHeavyItalic" }}>
          SchotisHeavyItalic
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "SchotisItalic" }}>
          SchotisItalic
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "SchotisLight" }}>
          SchotisLight
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "SchotisLightItalic" }}>
          SchotisLightItalic
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "SchotisSemiBold" }}>
          SchotisSemiBold
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "SchotisSemiBoldItalic" }}>
          SchotisSemiBoldItalic
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "Schotis" }}>Schotis</Text>
        <Text style={{ fontSize: 20, fontFamily: "HellsSansBold" }}>
          HellsSansBold
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "HellsSansBoldItalic" }}>
          HellsSansBoldItalic
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "HellsSansLight" }}>
          HellsSansLight
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "HellsSansLightItalic" }}>
          HellsSansLightItalic
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "HellsSansMedium" }}>
          HellsSansMedium
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "HellsSansMediumItalic" }}>
          HellsSansMediumItalic
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "HellsSerifBold" }}>
          HellsSerifBold
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "HellsSerifBoldItalic" }}>
          HellsSerifBoldItalic
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "HellsSerifLight" }}>
          HellsSerifLight
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "HellsSerifLightItalic" }}>
          HellsSerifLightItalic
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "HellsSerifMedium" }}>
          HellsSerifMedium
        </Text>
        <Text style={{ fontSize: 20, fontFamily: "HellsSerifMediumItalic" }}>
          HellsSerifMediumItalic
        </Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <EditScreenInfo path="app/(tabs)/discover.tsx" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
