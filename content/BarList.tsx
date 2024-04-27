import BarCard from '@/components/BarCard'
import { BodyText } from '@/components/_elements/Text'
import Button from '@/components/_inputs/Button'
import useBars from '@/lib/hooks/useBars'

const BarList = () => {
  const { isFetching, error, bars } = useBars()

  const handleCreateNewBar = () => {
    console.log('create new bar')
  }

  if (error) {
    return <BodyText>Error: {error.message}</BodyText>
  }

  if (isFetching) {
    return <BodyText>Loading...</BodyText>
  }

  if (bars.length === 0) {
    return <BodyText>No bars found</BodyText>
  }

  return (
    <>
      {bars.map((bar: any) => (
        <BarCard key={bar.id} bar={bar} />
      ))}
      <Button label="Create New Bar" onPress={handleCreateNewBar} />
    </>
  )
}

BarList.displayName = 'BarList'

export default BarList
