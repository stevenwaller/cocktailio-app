import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'

import Modal, { IModal, IModalProps } from '@/components/_overlays/Modal'
import ModalBody from '@/components/_overlays/ModalBody'
import ModalHeader from '@/components/_overlays/ModalHeader'
import { FONTS, COLORS } from '@/lib/constants'
import { SortableColumns } from '@/lib/types'

interface ISortOption {
  name: string
  value: SortableColumns
  ascending: boolean
  icon: string
}

const sortOptions: ISortOption[] = [
  {
    name: 'Date Added (new-old)',
    value: 'created_at',
    ascending: false,
    icon: 'sort-calendar-descending',
  },
  {
    name: 'Date Added (old-new)',
    value: 'created_at',
    ascending: true,
    icon: 'sort-calendar-ascending',
  },
  { name: 'Name (A-Z)', value: 'name', ascending: true, icon: 'sort-alphabetical-ascending' },
  { name: 'Name (Z-A)', value: 'name', ascending: false, icon: 'sort-alphabetical-descending' },
]

export interface ISortModal extends IModal {}

interface Props extends Omit<IModalProps, 'children'> {
  sortColumn?: SortableColumns
  isAscending?: boolean
  onComplete?: () => void
  onSortChange?: (column: SortableColumns, isAscending: boolean) => void
}

const snapPoints = ['35%']

const SortModal = forwardRef<ISortModal, Props>(
  (
    { sortColumn, isAscending, onComplete = () => {}, onSortChange = () => {}, ...restProps },
    ref,
  ) => {
    const modalRef = useRef<ISortModal>(null)

    useImperativeHandle(ref, () => modalRef.current as ISortModal)

    return (
      <Modal ref={modalRef} snapPoints={snapPoints} {...restProps}>
        <ModalHeader title="Sort" />
        <ModalBody>
          {sortOptions.map((option) => (
            <View key={option.name} style={styles.item}>
              <View style={styles.itemLeft}>
                <MaterialCommunityIcons
                  name={option.icon as any}
                  size={27}
                  color={COLORS.text.muted}
                  style={styles.icon}
                />
                <Text style={styles.name}>{option.name}</Text>
              </View>
              <Switch
                style={styles.switch}
                ios_backgroundColor={COLORS.bg.level1}
                trackColor={{ false: COLORS.bg.level1, true: COLORS.text.good }}
                onValueChange={() => {
                  onSortChange?.(option.value, option.ascending)
                }}
                thumbColor={COLORS.text.body}
                value={option.value === sortColumn && option.ascending === isAscending}
              />
            </View>
          ))}
        </ModalBody>
      </Modal>
    )
  },
)

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 18,
    color: COLORS.text.body,
  },
  icon: {
    marginRight: 10,
  },
  switch: {
    marginLeft: 15,
    height: 30,
  },
})

SortModal.displayName = 'SortModal'

export default SortModal
