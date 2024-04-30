import Card, { CardProps } from './Card'
import CardBody, { CardBodyProps } from './CardBody'
import CardHeader, { CardHeaderProps } from './CardHeader'
import CardHeaderText, { CardHeaderTextProps } from './CardHeaderText'

export { CardProps, CardBodyProps, CardHeaderProps, CardHeaderTextProps }

export default Object.assign(Card, {
  Body: CardBody,
  Header: CardHeader,
  HeaderText: CardHeaderText,
})
