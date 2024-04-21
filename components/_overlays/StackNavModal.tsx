import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import { NavigationContainer } from '@react-navigation/native'
import { forwardRef, useMemo, useCallback, ReactNode } from 'react'

import { COLORS } from '@/lib/constants'

interface IStackNavModalProps extends BottomSheetModalProps {
  children: ReactNode
}

const StackNavModal = forwardRef<BottomSheetModal, IStackNavModalProps>(
  ({ children, ...restProps }, ref) => {
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
        {...restProps}
      >
        <NavigationContainer independent>{children}</NavigationContainer>
      </BottomSheetModal>
    )
  },
)

StackNavModal.displayName = 'StackNavModal'

export default StackNavModal
