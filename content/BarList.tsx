import { BottomSheetModal, BottomSheetFooter } from '@gorhom/bottom-sheet'
import { useRef, useState } from 'react'
import { StyleSheet, ScrollView, View, Pressable, Text, Platform, TextInput } from 'react-native'

import BarCard from '@/components/BarCard'
import { BodyText } from '@/components/_elements/Text'
import Button from '@/components/_inputs/Button'
import { COLORS, FONTS, SIZE } from '@/lib/constants'
import useBars from '@/lib/hooks/useBars'

const BarList = () => {
  const { isFetching, error, bars } = useBars()
  const modalRef = useRef<BottomSheetModal>(null)

  const handleCreateNewBar = () => {
    console.log('create new bar')
    modalRef.current?.present()
  }

  const handleApply = () => {
    // onApply(filters)
    modalRef.current?.dismiss()
  }

  const renderFooter = (props: any) => (
    <BottomSheetFooter {...props}>
      <Pressable style={styles.footerButton} onPress={handleApply}>
        <Text style={styles.footerText}>Apply</Text>
      </Pressable>
    </BottomSheetFooter>
  )

  if (error) {
    return <BodyText>Error: {error.message}</BodyText>
  }

  if (isFetching) {
    return <BodyText>Loading...</BodyText>
  }

  if (bars.length === 0) {
    return <BodyText>No bars found</BodyText>
  }

  return (
    <>
      {bars.map((bar: any) => (
        <BarCard key={bar.id} bar={bar} />
      ))}
      <Button label="Create New Bar" onPress={handleCreateNewBar} />
    </>
  )
}

const styles = StyleSheet.create({
  footerButton: {
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 35 : 15,
    backgroundColor: COLORS.bg.action,
  },
  footerText: {
    fontSize: 16,
    fontFamily: FONTS.hells.sans.bold,
    textAlign: 'center',
    color: COLORS.text.dark,
  },
})

BarList.displayName = 'BarList'

export default BarList
