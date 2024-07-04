import { useNavigation, NavigationProp } from '@react-navigation/native'
import { Pressable, ViewProps, View } from 'react-native'

import CanMake from '@/components/CanMake'
import Card from '@/components/Card'
import IngredientsText from '@/components/IngredientsText'
import BookmarkIcon from '@/components/_icons/Bookmark'
import BookmarkSolidIcon from '@/components/_icons/BookmarkSolid'
import { COLORS } from '@/lib/constants'
import { CocktailsStackParamList } from '@/lib/types'
import { TCocktail, TBar } from '@/lib/types/supabase'

interface CocktailCardProps extends ViewProps {
  cocktail: TCocktail
  onBookmarkPress?: (cocktail: TCocktail) => void
  isBookmarked?: boolean
  bar?: TBar
}

const CocktailCard = ({
  cocktail,
  onBookmarkPress = () => {},
  isBookmarked,
  bar,
  ...restProps
}: CocktailCardProps) => {
  const navigation = useNavigation<NavigationProp<CocktailsStackParamList>>()
  const { name } = cocktail

  return (
    <Card {...restProps}>
      <Card.Header>
        <Pressable
          onPress={() =>
            navigation.navigate('Cocktail', {
              cocktailId: cocktail.id,
              name,
            })
          }
        >
          <Card.HeaderText isLink>{name}</Card.HeaderText>
        </Pressable>
        <Pressable onPress={() => onBookmarkPress(cocktail)}>
          {isBookmarked ? (
            <BookmarkSolidIcon color={COLORS.text.link} />
          ) : (
            <BookmarkIcon color={COLORS.text.link} />
          )}
        </Pressable>
      </Card.Header>
      <Card.Body>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CanMake
            cocktail={cocktail}
            bar={bar}
            width={15}
            height={15}
            style={{ marginRight: 8 }}
          />
          <IngredientsText cocktail={cocktail} bar={bar} style={{ marginTop: 1 }} />
        </View>
        {/* <View style={{ marginTop: 20 }}>
          <BodyText style={{ marginBottom: 5 }}>SOURCES:</BodyText>
          {cocktail.sources?.map((source) => (
            <Text key={source.id} style={styles.ingredients}>
              {source.source.name}
            </Text>
          ))}
        </View>
        <View style={{ marginTop: 20 }}>
          <BodyText style={{ marginBottom: 5 }}>METHOD:</BodyText>
          <BodyText>{cocktail.method?.name}</BodyText>
        </View>
        <View style={{ marginTop: 20 }}>
          <BodyText style={{ marginBottom: 5 }}>ERA:</BodyText>
          <BodyText>{cocktail.era?.name}</BodyText>
        </View>
        <View style={{ marginTop: 20 }}>
          <BodyText style={{ marginBottom: 5 }}>GLASSWARE:</BodyText>
          <BodyText>{cocktail.glass?.name}</BodyText>
        </View> */}
      </Card.Body>
    </Card>
  )
}

CocktailCard.displayName = 'CocktailCard'

export default CocktailCard
