import { useRef, useState } from 'react'

import NewBarModal from './NewBarModal'
import MoreBarModal, { IMoreBarModal } from '../MoreBarModal'

import BarCard from '@/components/BarCard'
import { BodyText } from '@/components/_elements/Text'
import PlusIcon from '@/components/_icons/Plus'
import Button from '@/components/_inputs/Button'
import { IModal } from '@/components/_overlays/Modal'
import { COLORS } from '@/lib/constants'
import useBars from '@/lib/hooks/useBars'

const BarList = () => {
  const { isFetching, error, bars } = useBars()
  const newModalRef = useRef<IModal>(null)
  const moreModalRef = useRef<IMoreBarModal>(null)
  const [currentBarId, setCurrentBarId] = useState<string>()

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
        <BarCard
          style={{ marginBottom: 20 }}
          key={bar.id}
          bar={bar}
          multipleBars={bars.length > 1}
          onMorePress={() => {
            setCurrentBarId(bar.id)
            moreModalRef.current?.present()
          }}
        />
      ))}
      <Button
        slotLeft={<PlusIcon color={COLORS.text.dark} />}
        label="Create New Bar"
        onPress={() => newModalRef.current?.present()}
      />
      <NewBarModal ref={newModalRef} onComplete={() => newModalRef.current?.dismiss()} />
      <MoreBarModal
        ref={moreModalRef}
        barId={currentBarId}
        onComplete={() => moreModalRef.current?.dismiss()}
      />
    </>
  )
}

BarList.displayName = 'BarList'

export default BarList
