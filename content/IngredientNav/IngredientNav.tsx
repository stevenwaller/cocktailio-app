import { Text, StyleSheet } from 'react-native'

import IngredientList from './components/IngredientList'

import { Tabs, Tab, TabList, TabPanel } from '@/components/Tabs'
import { TIngredient } from '@/lib/types/supabase'

interface Props {
  checkIfSelected: (item: TIngredient) => boolean
  onSelect: (item: TIngredient) => void
  onDeselectAll?: () => void
}

const IngredientNav = ({ checkIfSelected, onSelect, onDeselectAll }: Props) => {
  return (
    <Tabs defaultValue="all">
      <TabList>
        <Tab value="all">All</Tab>
        <Tab value="essentials">Essentials</Tab>
        <Tab value="recommended" isLast>
          Recommended
        </Tab>
      </TabList>
      <TabPanel value="all" style={styles.tabPanel}>
        <IngredientList
          onSelect={onSelect}
          onDeselectAll={onDeselectAll}
          checkIfSelected={checkIfSelected}
        />
      </TabPanel>
      <TabPanel value="essentials" style={styles.tabPanel}>
        <Text>Essentials</Text>
      </TabPanel>
      <TabPanel value="recommended" style={styles.tabPanel}>
        <Text>Recommended</Text>
      </TabPanel>
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabPanel: {
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 20,
    paddingLeft: 20,
  },
})

IngredientNav.displayName = 'IngredientNav'

export default IngredientNav
