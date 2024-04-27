import { ReactNode } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import Badge from '@/components/Badge'
import Card from '@/components/Card'
import ChevronDownIcon from '@/components/_icons/ChevronDown'
import ChevronUpIcon from '@/components/_icons/ChevronUp'
import { SIZE, COLORS } from '@/lib/constants'

interface AccordionCardProps {
  title: string
  children: ReactNode
  isOpen?: boolean
  count?: number
  onToggle?: () => void
}

const AccordionCard = ({
  title,
  children,
  isOpen,
  count,
  onToggle = () => {},
  ...restProps
}: AccordionCardProps) => {
  return (
    <Card {...restProps}>
      <Pressable onPress={onToggle}>
        <Card.Header style={[styles.header, !isOpen && styles.closedHeader]}>
          <Card.HeaderText>{title}</Card.HeaderText>
          <View style={styles.headerRight}>
            {!isOpen && count ? <Badge style={styles.badge}>{count}</Badge> : null}
            {isOpen ? (
              <ChevronUpIcon color={COLORS.text.link} />
            ) : (
              <ChevronDownIcon color={COLORS.text.link} />
            )}
          </View>
        </Card.Header>
      </Pressable>
      {isOpen && <Card.Body>{children}</Card.Body>}
    </Card>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginRight: 10,
  },
  closedHeader: {
    borderBottomStartRadius: SIZE.border.radius,
    borderBottomEndRadius: SIZE.border.radius,
  },
})

AccordionCard.displayName = 'AccordionCard'

export default AccordionCard
