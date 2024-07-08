import { useRef, useState, useEffect } from 'react'
import { ScrollView, RefreshControl, ActivityIndicator } from 'react-native'

import NewBarModal from './NewBarModal'
import MoreBarModal, { IMoreBarModal } from '../MoreBarModal'

import BarCard from '@/components/BarCard'
import ErrorAlert from '@/components/ErrorAlert'
import PageContainer from '@/components/PageContainer'
import PlusIcon from '@/components/_icons/Plus'
import Button from '@/components/_inputs/Button'
import { IModal } from '@/components/_overlays/Modal'
import { COLORS } from '@/lib/constants'
import { useBars } from '@/lib/contexts/BarsContext'

const BarList = () => {
  const { isFetching, refetch, error, bars } = useBars()
  const newModalRef = useRef<IModal>(null)
  const moreModalRef = useRef<IMoreBarModal>(null)
  const [currentBarId, setCurrentBarId] = useState<string>()
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
  }, [])

  if (isFetching && !isMounted.current) {
    return (
      <PageContainer>
        <ActivityIndicator size="small" />
      </PageContainer>
    )
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isFetching && isMounted.current}
          onRefresh={refetch}
          tintColor={COLORS.text.body}
        />
      }
    >
      <PageContainer>
        <ErrorAlert message={error?.message} />
        {bars.map((bar: any) => (
          <BarCard
            style={{ marginBottom: 20 }}
            key={bar.id}
            bar={bar}
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
      </PageContainer>
    </ScrollView>
  )
}

BarList.displayName = 'BarList'

export default BarList
