import { BottomSheetView } from '@gorhom/bottom-sheet'
import { Text, StyleSheet, ViewProps } from 'react-native'

import { COLORS, FONTS } from '@/lib/constants'

interface IModalHeaderProps extends ViewProps {
  title: string
}

const ModalHeader = ({ title }: IModalHeaderProps) => {
  return (
    <BottomSheetView style={styles.modalHeader}>
      <Text style={styles.modalHeaderText}>{title}</Text>
    </BottomSheetView>
  )
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 35,
  },
  modalHeaderText: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.schotis.bold,
    top: -5,
  },
})

ModalHeader.displayName = 'ModalHeader'

export default ModalHeader
