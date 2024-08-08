import { useRef, useState } from 'react'
import { ScrollView, RefreshControl, StyleSheet } from 'react-native'

import NewBarModal from './NewBarModal'
import MoreBarModal, { IMoreBarModal } from '../MoreBarModal'

import BarCard from '@/components/BarCard'
import ErrorAlert from '@/components/ErrorAlert'
import PageContainer from '@/components/PageContainer'
import PlusIcon from '@/components/_icons/Plus'
import Button from '@/components/_inputs/Button'
import Skeleton from '@/components/_loaders/Skeleton'
import { IModal } from '@/components/_overlays/Modal'
import { COLORS } from '@/lib/constants'
import { useBars } from '@/lib/contexts/BarsContext'
import useIsMounted from '@/lib/hooks/useIsMounted'

const BarList = () => {
  const { isFetching, refetch, error, bars } = useBars()
  const newModalRef = useRef<IModal>(null)
  const moreModalRef = useRef<IMoreBarModal>(null)
  const [currentBarId, setCurrentBarId] = useState<string>()
  const checkIfMounted = useIsMounted()

  if (isFetching && !checkIfMounted()) {
    return (
      <PageContainer>
        <Skeleton style={styles.card} height={132} />
        <Skeleton height={40} />
      </PageContainer>
    )
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isFetching && checkIfMounted()}
          onRefresh={refetch}
          tintColor={COLORS.text.body}
        />
      }
    >
      <PageContainer>
        <ErrorAlert message={error?.message} />
        {bars.map((bar: any) => (
          <BarCard
            style={styles.card}
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

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
})

BarList.displayName = 'BarList'

export default BarList
