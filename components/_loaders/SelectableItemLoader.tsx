import { View, ViewProps } from 'react-native'

import Skeleton from '@/components/_loaders/Skeleton'

interface IProps extends ViewProps {
  bgColor?: string
}

const SelectableItemLoader = ({ style, bgColor, ...restProps }: IProps) => {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]} {...restProps}>
      <Skeleton width={27} height={26} borderRadius={14} bgColor={bgColor} />
      <Skeleton style={{ marginLeft: 10 }} width={100} height={18} bgColor={bgColor} />
    </View>
  )
}

SelectableItemLoader.displayName = 'SelectableItemLoader'

export default SelectableItemLoader
