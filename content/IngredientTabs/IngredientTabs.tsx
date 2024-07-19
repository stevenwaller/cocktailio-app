import { StyleSheet } from 'react-native'

import AllIngredients from './tabPanels/AllIngredients'
import CommonIngredients from './tabPanels/CommonIngredients'
import SearchIngredients from './tabPanels/SearchIngredients'
import SelectedIngredients from './tabPanels/SelectedIngredients'

import { Tabs, Tab, TabList, TabPanel } from '@/components/Tabs'
import SearchIcon from '@/components/_icons/Search'
import { COLORS } from '@/lib/constants'
import { TIngredient } from '@/lib/types/supabase'

interface Props {
  checkIfSelected: (item: TIngredient) => boolean
  onSelect: (item: TIngredient) => void
  onDeselectAll?: () => void
  isInModal?: boolean
}

const IngredientTabs = ({ checkIfSelected, onSelect, onDeselectAll, isInModal }: Props) => {
  return (
    <Tabs defaultValue="all">
      <TabList style={{ position: 'absolute', zIndex: 100 }}>
        <Tab
          value="search"
          icon={<SearchIcon color={COLORS.text.link} />}
          style={{ paddingHorizontal: 13 }}
        />
        <Tab value="all">All</Tab>
        <Tab value="selected">Selected</Tab>
        <Tab value="common">Common</Tab>
      </TabList>
      <TabPanel value="search" style={styles.tabPanel} scrollable isInModal={isInModal}>
        <SearchIngredients onSelect={onSelect} checkIfSelected={checkIfSelected} />
      </TabPanel>
      <TabPanel value="all" style={styles.tabPanel} scrollable isInModal={isInModal}>
        <AllIngredients onSelect={onSelect} checkIfSelected={checkIfSelected} />
      </TabPanel>
      <TabPanel value="selected" style={styles.tabPanel} scrollable isInModal={isInModal}>
        <SelectedIngredients onSelect={onSelect} checkIfSelected={checkIfSelected} />
      </TabPanel>
      <TabPanel value="common" style={styles.tabPanel} scrollable isInModal={isInModal}>
        <CommonIngredients onSelect={onSelect} checkIfSelected={checkIfSelected} />
      </TabPanel>
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabPanel: {
    paddingTop: 46,
    paddingRight: 15,
    paddingBottom: 46,
    paddingLeft: 20,
  },
})

IngredientTabs.displayName = 'IngredientTabs'

export default IngredientTabs
