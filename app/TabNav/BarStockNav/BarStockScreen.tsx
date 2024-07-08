import PageContainer from '@/components/PageContainer'
import { BodyText } from '@/components/_elements/Text'
import Button from '@/components/_inputs/Button'
import BarList from '@/content/BarList'
import { useAuthModal } from '@/lib/contexts/AuthModalContext'
import { useUser } from '@/lib/contexts/UserContext'

export default function BarStockScreen() {
  const { openAuthModal } = useAuthModal()
  const { user } = useUser()

  if (user) {
    return <BarList />
  }

  return (
    <PageContainer>
      <BodyText>Create a free account or sign in to manage your bar stock</BodyText>
      <Button label="Create a free account / Sign in" onPress={() => openAuthModal()} />
    </PageContainer>
  )
}
