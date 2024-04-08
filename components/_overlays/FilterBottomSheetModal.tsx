import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps
} from '@gorhom/bottom-sheet'
import { forwardRef, useMemo, useCallback } from 'react'
import { Text, StyleSheet } from 'react-native'

import { COLORS } from '@/lib/constants'

interface FilterSheetProps {
  onChange?: (index: number) => void
}

const FilterSheet = forwardRef<BottomSheetModal, FilterSheetProps>(({ onChange }, ref) => {
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], [])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.43} />
    ),
    []
  )

  return (
    <BottomSheetModal
      ref={ref}
      onChange={onChange}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: COLORS.bg.level3 }}
      handleIndicatorStyle={{ backgroundColor: COLORS.text.link }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome Sauce 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  }
})

FilterSheet.displayName = 'FilterSheet'

export default FilterSheet
