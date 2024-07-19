import { Text, StyleSheet } from 'react-native'

import AllIngredients from './tabPanels/AllIngredients'
import SearchIngredients from './tabPanels/SearchIngredients'
import SelectedIngredients from './tabPanels/SelectedIngredientList'

import { Tabs, Tab, TabList, TabPanel } from '@/components/Tabs'
import SearchIcon from '@/components/_icons/Search'
import { COLORS } from '@/lib/constants'
import { TIngredient } from '@/lib/types/supabase'

interface Props {
  checkIfSelected: (item: TIngredient) => boolean
  onSelect: (item: TIngredient) => void
  onDeselectAll?: () => void
}

const IngredientTabs = ({ checkIfSelected, onSelect, onDeselectAll }: Props) => {
  return (
    <Tabs defaultValue="all">
      <TabList>
        <Tab
          value="search"
          icon={<SearchIcon color={COLORS.text.link} />}
          style={{ paddingHorizontal: 13 }}
        />
        <Tab value="all">All</Tab>
        <Tab value="selected">Selected</Tab>
        <Tab value="essentials">Essentials</Tab>
        <Tab value="recommended" isLast>
          Recommended
        </Tab>
      </TabList>
      <TabPanel value="search" style={styles.tabPanel}>
        <SearchIngredients onSelect={onSelect} checkIfSelected={checkIfSelected} />
      </TabPanel>
      <TabPanel value="all" style={styles.tabPanel}>
        <AllIngredients onSelect={onSelect} checkIfSelected={checkIfSelected} />
      </TabPanel>
      <TabPanel value="selected" style={styles.tabPanel}>
        <SelectedIngredients onSelect={onSelect} checkIfSelected={checkIfSelected} />
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

IngredientTabs.displayName = 'IngredientTabs'

export default IngredientTabs
