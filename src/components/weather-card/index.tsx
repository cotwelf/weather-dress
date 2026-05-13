import { View, Text } from '@tarojs/components'
import type { WeatherDisplayData } from '../../../types/weather'
import './index.scss'

interface Props {
  data: WeatherDisplayData
}

export default function WeatherCard({ data }: Props) {
  return (
    <View className='weather-card'>
      <View className='weather-card__main'>
        <Text className='weather-card__icon'>{data.weatherIcon}</Text>
        <Text className='weather-card__temp'>{Math.round(data.currentTemp)}℃</Text>
      </View>
      <Text className='weather-card__desc'>{data.weatherText}</Text>
      <View className='weather-card__range'>
        <Text className='weather-card__range-text'>
          今日 {Math.round(data.tempMin)}℃ ~ {Math.round(data.tempMax)}℃
        </Text>
      </View>
      <View className='weather-card__detail'>
        <View className='weather-card__detail-item'>
          <Text className='weather-card__detail-label'>体感</Text>
          <Text className='weather-card__detail-value'>{Math.round(data.feelsLike)}℃</Text>
        </View>
        <View className='weather-card__detail-item'>
          <Text className='weather-card__detail-label'>湿度</Text>
          <Text className='weather-card__detail-value'>{data.humidity}%</Text>
        </View>
        <View className='weather-card__detail-item'>
          <Text className='weather-card__detail-label'>风速</Text>
          <Text className='weather-card__detail-value'>{Math.round(data.windSpeed)} km/h</Text>
        </View>
      </View>
    </View>
  )
}
