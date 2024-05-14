import { useNavigation, NavigationProp } from '@react-navigation/native'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import Card, { CardProps } from '@/components/Card'
import ChevronRightIcon from '@/components/_icons/ChevronRight'
import MoreIcon from '@/components/_icons/More'
import { FONTS, COLORS } from '@/lib/constants'
import { CollectionsStackParamList } from '@/lib/types'
import { TCollection } from '@/lib/types/supabase'

interface CollectionCardProps extends CardProps {
  collection: TCollection
  onMorePress?: (collection: TCollection) => void
}

const CollectionCard = ({
  collection,
  onMorePress = () => {},
  ...restProps
}: CollectionCardProps) => {
  const navigation = useNavigation<NavigationProp<CollectionsStackParamList>>()
  const { name } = collection

  return (
    <Card {...restProps}>
      <Card.Header>
        <Card.HeaderText>{name}</Card.HeaderText>
        <Pressable style={styles.more} onPress={() => onMorePress(collection)}>
          <MoreIcon color={COLORS.text.link} />
        </Pressable>
      </Card.Header>
      <Card.Body>
        <Pressable
          onPress={() => {
            navigation.navigate('Cocktails', {
              collectionId: collection.id,
              name: collection.name,
            })
          }}
        >
          <View style={[styles.action, { marginBottom: 10 }]}>
            <Text style={styles.actionText}>View cocktails</Text>
            <ChevronRightIcon color={COLORS.text.link} />
          </View>
        </Pressable>
      </Card.Body>
    </Card>
  )
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    color: COLORS.text.link,
    fontFamily: FONTS.schotis.bold,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 16,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.bold,
  },
  actionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginRight: 5,
  },
  more: {
    height: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
})

CollectionCard.displayName = 'CollectionCard'

export default CollectionCard
