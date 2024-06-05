import { useNavigation, NavigationProp } from '@react-navigation/native'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import Badge from '@/components/Badge'
import Card, { CardProps } from '@/components/Card'
import ChevronRightIcon from '@/components/_icons/ChevronRight'
import MoreIcon from '@/components/_icons/More'
import { FONTS, COLORS } from '@/lib/constants'
import { BarStockStackParamList } from '@/lib/types'
import { TBar } from '@/lib/types/supabase'

interface BarCardProps extends CardProps {
  bar: TBar
  onMorePress?: (bar: TBar) => void
}

const BarCard = ({ bar, onMorePress = () => {}, ...restProps }: BarCardProps) => {
  const navigation = useNavigation<NavigationProp<BarStockStackParamList>>()
  const { name } = bar

  return (
    <Card {...restProps}>
      <Card.Header>
        <Card.HeaderText>{name}</Card.HeaderText>
        <View style={styles.headerRight}>
          {bar.is_default && <Text style={styles.defaultLabel}>Default Bar</Text>}
          <Pressable style={styles.more} onPress={() => onMorePress(bar)}>
            <MoreIcon color={COLORS.text.link} />
          </Pressable>
        </View>
      </Card.Header>
      <Card.Body>
        <Pressable
          onPress={() => {
            navigation.navigate('Bar Ingredients', {
              barId: bar.id,
            })
          }}
        >
          <View style={[styles.action, { marginBottom: 20 }]}>
            <Text style={styles.actionText}>Add/Remove Ingredients</Text>
            <View style={styles.actionRight}>
              {bar.bar_ingredients.length > 0 && (
                <Badge style={styles.badge}>{bar.bar_ingredients.length}</Badge>
              )}
              <ChevronRightIcon color={COLORS.text.link} />
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Bar', {
              barId: bar.id,
            })
          }}
        >
          <View style={[styles.action, { marginBottom: 10 }]}>
            <Text style={styles.actionText}>View cocktails you can make</Text>
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultLabel: {
    fontSize: 13,
    fontFamily: FONTS.hells.sans.bold,
    marginRight: 15,
    color: COLORS.text.muted,
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

BarCard.displayName = 'BarCard'

export default BarCard
