import { View, Text } from '@tarojs/components'
import type { ClothingAdvice as ClothingAdviceType } from '../../../types/weather'
import './index.scss'

interface Props {
  advice: ClothingAdviceType
  hasRain: boolean
}

export default function ClothingAdvice({ advice, hasRain }: Props) {
  return (
    <View className='clothing-advice'>
      <View className='clothing-advice__main'>
        <Text className='clothing-advice__icon'>{advice.clothingIcon}</Text>
        <View className='clothing-advice__content'>
          <Text className='clothing-advice__title'>穿衣建议</Text>
          <Text className='clothing-advice__text'>{advice.clothing}</Text>
        </View>
      </View>
      {advice.tips.length > 0 && (
        <View className='clothing-advice__tips'>
          {advice.tips.map((tip, idx) => (
            <View key={idx} className='clothing-advice__tip'>
              <Text className='clothing-advice__tip-icon'>
                {hasRain && idx === 0 ? '🌂' : '💡'}
              </Text>
              <Text className='clothing-advice__tip-text'>{tip}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
