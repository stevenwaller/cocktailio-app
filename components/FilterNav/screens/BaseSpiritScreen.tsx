import { Text } from 'react-native'

import { IFilter } from '@/lib/types'

interface BaseSpiritScreenProps {
  onChange: (filter: IFilter) => void
}

const BaseSpiritScreen = (props: BaseSpiritScreenProps) => {
  return <Text>In Stock</Text>
}

BaseSpiritScreen.displayName = 'BaseSpiritScreen'

export default BaseSpiritScreen
