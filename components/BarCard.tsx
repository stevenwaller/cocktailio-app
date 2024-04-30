import { Link } from 'expo-router'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import Badge from '@/components/Badge'
import Card, { CardProps } from '@/components/Card'
import ChevronRightIcon from '@/components/_icons/ChevronRight'
import MoreIcon from '@/components/_icons/More'
import { FONTS, COLORS } from '@/lib/constants'
import { TBar } from '@/lib/types/supabase'

interface BarCardProps extends CardProps {
  bar: TBar
  onMorePress?: (bar: TBar) => void
}

const BarCard = ({ bar, onMorePress = () => {}, ...restProps }: BarCardProps) => {
  const { name } = bar

  return (
    <Card {...restProps}>
      <Card.Header>
        <Card.HeaderText>{name}</Card.HeaderText>
        <Pressable style={styles.more} onPress={() => onMorePress(bar)}>
          <MoreIcon color={COLORS.text.link} />
        </Pressable>
      </Card.Header>
      <Card.Body>
        <Link
          style={[styles.action, { marginBottom: 20 }]}
          href={`/barStock/${bar.id}/ingredients`}
          asChild
        >
          <Pressable>
            <Text style={styles.actionText}>Add/Remove Ingredients</Text>
            <View style={styles.actionRight}>
              {bar.bar_ingredients.length > 0 && (
                <Badge style={styles.badge}>{bar.bar_ingredients.length}</Badge>
              )}
              <ChevronRightIcon color={COLORS.text.link} />
            </View>
          </Pressable>
        </Link>
        <Link
          style={[styles.action, { marginBottom: 10 }]}
          href={
            {
              pathname: `/barStock/${bar.id}/cocktails`,
              params: { name: bar.name },
            } as never
          }
          asChild
        >
          <Pressable>
            <Text style={styles.actionText}>View cocktails you can make</Text>
            <ChevronRightIcon color={COLORS.text.link} />
          </Pressable>
        </Link>
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

BarCard.displayName = 'BarCard'

export default BarCard
