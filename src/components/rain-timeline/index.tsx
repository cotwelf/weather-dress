import { View, Text } from '@tarojs/components'
import type { RainPeriod } from '../../../types/weather'
import './index.scss'

interface Props {
  periods: RainPeriod[]
}

export default function RainTimeline({ periods }: Props) {
  if (periods.length === 0) return null

  return (
    <View className='rain-timeline'>
      <View className='rain-timeline__header'>
        <Text className='rain-timeline__icon'>🌧</Text>
        <Text className='rain-timeline__title'>降雨预报</Text>
      </View>
      {periods.map((period, idx) => (
        <View key={idx} className='rain-timeline__item'>
          <View className='rain-timeline__bar' />
          <Text className='rain-timeline__time'>
            {period.startLabel} ~ {period.endLabel}
          </Text>
          <Text className='rain-timeline__prob'>
            降水概率 {period.maxProbability}%
          </Text>
        </View>
      ))}
    </View>
  )
}
