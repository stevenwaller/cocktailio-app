import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'
import { forwardRef, useMemo, useCallback, ReactNode } from 'react'

import { COLORS } from '@/lib/constants'

interface IStackNavModalProps {
  children: ReactNode
}

const StackNavModal = forwardRef<BottomSheetModal, IStackNavModalProps>(({ children }, ref) => {
  const snapPoints = useMemo(() => ['50%'], [])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.43} />
    ),
    [],
  )

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: COLORS.nav.bg }}
      handleIndicatorStyle={{ backgroundColor: COLORS.text.link }}
    >
      <NavigationContainer independent>{children}</NavigationContainer>
    </BottomSheetModal>
  )
})

StackNavModal.displayName = 'StackNavModal'

export default StackNavModal
