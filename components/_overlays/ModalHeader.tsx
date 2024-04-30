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
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeaderText: {
    fontSize: 20,
    color: COLORS.text.body,
    fontFamily: FONTS.schotis.bold,
    paddingTop: 5,
    paddingBottom: 10,
  },
})

ModalHeader.displayName = 'ModalHeader'

export default ModalHeader
