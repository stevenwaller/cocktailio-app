import { Text } from 'react-native'

import { IFilter } from '@/lib/types'

interface InBarStockScreenProps {
  onChange: (filter: IFilter) => void
}

const InBarStockScreen = (props: InBarStockScreenProps) => {
  return <Text>In Bar Stock</Text>
}

InBarStockScreen.displayName = 'InBarStockScreen'

export default InBarStockScreen
