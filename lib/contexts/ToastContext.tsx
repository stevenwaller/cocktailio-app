import { ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  ToastProvider as ToastProviderPrimitive,
  useToast as useToastPrimitive,
} from 'react-native-toast-notifications'

import BookmarkIcon from '@/components/_icons/Bookmark'
import BookmarkSolidIcon from '@/components/_icons/BookmarkSolid'
import { COLORS, FONTS } from '@/lib/constants'

export const useToast = useToastPrimitive

interface IToastProvider {
  children: ReactNode
}

export const ToastProvider = ({ children: parentChildren }: IToastProvider) => (
  <ToastProviderPrimitive
    duration={2000}
    renderToast={({ message, data }) => {
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.contentLeft}>
              {data.add ? (
                <BookmarkSolidIcon style={styles.icon} color={COLORS.text.body} />
              ) : (
                <BookmarkIcon style={styles.icon} color={COLORS.text.body} />
              )}
              <Text>
                <Text style={styles.message}>{message}</Text>
                {data.collection && <Text style={styles.collection}>{data.collection.name}</Text>}
              </Text>
            </View>
          </View>
        </View>
      )
    }}
  >
    {parentChildren}
  </ToastProviderPrimitive>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  message: {
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.medium,
    fontSize: 14,
  },
  collection: {
    color: COLORS.text.body,
    fontFamily: FONTS.hells.sans.bold,
    fontSize: 14,
  },
})
