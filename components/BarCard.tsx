import { Link } from 'expo-router'
import { StyleSheet, Text } from 'react-native'

import Card from '@/components/Card'
import ChevronRightIcon from '@/components/_icons/ChevronRight'
import { FONTS, COLORS } from '@/lib/constants'
import { TBar } from '@/lib/types/supabase'

interface BarCardProps {
  bar: TBar
}

const BarCard = ({ bar, ...restProps }: BarCardProps) => {
  const { name } = bar

  return (
    <Card {...restProps}>
      <Card.Header>
        <Link
          style={styles.name}
          href={
            {
              pathname: `/barStock/${bar.id}`,
              params: { name: bar.name },
            } as never
          }
          asChild
        >
          <Card.HeaderText isLink>{name}</Card.HeaderText>
        </Link>
      </Card.Header>
      <Card.Body>
        <Link
          style={styles.action}
          href={
            {
              pathname: `/barStock/${bar.id}/ingredients`,
              params: { name: bar.name },
            } as never
          }
        >
          <Text style={styles.actionText}>Add/Remove Ingredients</Text>
          <ChevronRightIcon color={COLORS.text.link} />
        </Link>
        <Link
          style={styles.action}
          href={
            {
              pathname: `/barStock/${bar.id}/cocktails`,
              params: { name: bar.name },
            } as never
          }
        >
          <Text style={styles.actionText}>View cocktails you can make</Text>
          <ChevronRightIcon color={COLORS.text.link} />
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
  action: {},
  actionText: {
    fontSize: 14,
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.bold,
  },
})

BarCard.displayName = 'BarCard'

export default BarCard
