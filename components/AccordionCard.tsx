import { ReactNode } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import Card from '@/components/Card'
import ChevronDownIcon from '@/components/_icons/ChevronDown'
import ChevronUpIcon from '@/components/_icons/ChevronUp'
import { SIZE, COLORS } from '@/lib/constants'

interface AccordionCardProps {
  title: string
  children: ReactNode
  isOpen?: boolean
  onToggle?: () => void
}

const AccordionCard = ({
  title,
  children,
  isOpen,
  onToggle = () => {},
  ...restProps
}: AccordionCardProps) => {
  return (
    <Card {...restProps}>
      <Card.Header style={[styles.header, !isOpen && styles.closedHeader]}>
        <Card.HeaderText>{title}</Card.HeaderText>
        <Pressable onPress={onToggle}>
          {isOpen ? (
            <ChevronUpIcon color={COLORS.text.link} />
          ) : (
            <ChevronDownIcon color={COLORS.text.link} />
          )}
        </Pressable>
      </Card.Header>
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
  closedHeader: {
    borderBottomStartRadius: SIZE.border.radius,
    borderBottomEndRadius: SIZE.border.radius,
  },
})

AccordionCard.displayName = 'AccordionCard'

export default AccordionCard
