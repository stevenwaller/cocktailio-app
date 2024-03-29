import { StyleSheet, ScrollView, Text, View } from 'react-native'

import { FONTS, COLORS } from '@/lib/constants'

export default function BarStockScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.black }}>
          SchotisBlack
        </Text>
        <Text
          style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.blackItalic }}
        >
          SchotisBlackItalic
        </Text>
        <Text style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.bold }}>
          SchotisBold
        </Text>
        <Text
          style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.boldItalic }}
        >
          SchotisBoldItalic
        </Text>
        <Text style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.book }}>
          SchotisBook
        </Text>
        <Text
          style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.bookItalic }}
        >
          SchotisBookItalic
        </Text>
        <Text style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.heavy }}>
          SchotisHeavy
        </Text>
        <Text
          style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.heavyItalic }}
        >
          SchotisHeavyItalic
        </Text>
        <Text style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.italic }}>
          SchotisItalic
        </Text>
        <Text style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.light }}>
          SchotisLight
        </Text>
        <Text
          style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.lightItalic }}
        >
          SchotisLightItalic
        </Text>
        <Text style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.semiBold }}>
          SchotisSemiBold
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.text.body,
            fontFamily: FONTS.schotis.semiBoldItalic
          }}
        >
          SchotisSemiBoldItalic
        </Text>
        <Text style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.schotis.normal }}>
          Schotis
        </Text>
        <Text style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.hells.sans.bold }}>
          HellsSansBold
        </Text>
        <Text
          style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.hells.sans.boldItalic }}
        >
          HellsSansBoldItalic
        </Text>
        <Text style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.hells.sans.light }}>
          HellsSansLight
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.text.body,
            fontFamily: FONTS.hells.sans.lightItalic
          }}
        >
          HellsSansLightItalic
        </Text>
        <Text
          style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.hells.sans.medium }}
        >
          HellsSansMedium
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.text.body,
            fontFamily: FONTS.hells.sans.mediumItalic
          }}
        >
          HellsSansMediumItalic
        </Text>
        <Text style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.hells.serif.bold }}>
          HellsSerifBold
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.text.body,
            fontFamily: FONTS.hells.serif.boldItalic
          }}
        >
          HellsSerifBoldItalic
        </Text>
        <Text
          style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.hells.serif.light }}
        >
          HellsSerifLight
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.text.body,
            fontFamily: FONTS.hells.serif.lightItalic
          }}
        >
          HellsSerifLightItalic
        </Text>
        <Text
          style={{ fontSize: 20, color: COLORS.text.body, fontFamily: FONTS.hells.serif.medium }}
        >
          HellsSerifMedium
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.text.body,
            fontFamily: FONTS.hells.serif.mediumItalic
          }}
        >
          HellsSerifMediumItalic
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
