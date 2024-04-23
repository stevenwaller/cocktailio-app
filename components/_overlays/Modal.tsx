import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import { forwardRef, useCallback, ReactNode } from 'react'

import { COLORS } from '@/lib/constants'

const defaultSnapPoints = ['50%']

export interface IModalProps extends BottomSheetModalProps {
  children: ReactNode
  snapPoints?: string[]
}

const Modal = forwardRef<BottomSheetModal, IModalProps>(
  ({ children, snapPoints = defaultSnapPoints, ...restProps }, ref) => {
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
        backgroundStyle={{ backgroundColor: COLORS.bg.level2 }}
        handleIndicatorStyle={{ backgroundColor: COLORS.text.link }}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.39,
          shadowRadius: 8.3,

          elevation: 13,
        }}
        {...restProps}
      >
        {children}
      </BottomSheetModal>
    )
  },
)

Modal.displayName = 'Modal'

export default Modal
