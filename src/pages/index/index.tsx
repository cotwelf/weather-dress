import { useState, useEffect, useCallback } from 'react'
import { View, Text, Image } from '@tarojs/components'
import CityPicker from '../../components/city-picker'
import ClothingItem, { ClothingItemProps, TagPos, getClothingItems } from '../../components/clothing-item'
import { fetchWeather } from '../../services/weather'
import { getClothingAdvice } from '../../utils/clothing'
import type { CityResult } from '../../../types/weather'
import bodyImg from '../../../assets/images/body.png'
import './index.scss'

// 衣物位置配置
const ITEM_POS_MAP: Record<string, Partial<ClothingItemProps>> = {
  '短袖': { className: 'tshirt', tagPosition: TagPos.Left, offsetX: -90, offsetY: -5, rotate: 20  },
  '吊带': { className: 'vest', tagPosition: TagPos.Left },
  '短裙': { className: 'skirt', tagPosition: TagPos.Left },
  '短T恤': { className: 'tshirt', tagPosition: TagPos.Left },
  'T恤': { className: 'tshirt', tagPosition: TagPos.Left, offsetX: -90, offsetY: -5, rotate: 20 },
  '卫衣': { className: 'hoodie', tagPosition: TagPos.Left, offsetX: -76, offsetY: 14, rotate: 20 },
  '薄外套': { className: 'light-jacket', tagPosition: TagPos.Right, offsetX: 76, offsetY: 10, rotate: -20 },
  '厚外套': { className: 'jacket', tagPosition: TagPos.Right },
  '外套': { className: 'jacket', tagPosition: TagPos.Right },
  '羽绒服': { className: 'jacket', tagPosition: TagPos.Right },
  '短裤': { className: 'short-pants', tagPosition: TagPos.Right, offsetX: 90, offsetY: 120, rotate: 20 },
  '长裤': { className: 'pants', tagPosition: TagPos.Right, offsetX: 94, offsetY: 150, rotate: 20  },
  '秋裤': { className: 'pants', tagPosition: TagPos.Right },
  '加绒裤': { className: 'pants', tagPosition: TagPos.Right },
}

const DEFAULT_CITY: CityResult = {
  id: 101020100,
  name: '上海',
  latitude: 31.23,
  longitude: 121.47,
  country: '中国',
  admin1: '上海',
  timezone: 'Asia/Shanghai',
}

export default function Index() {
  const [city, setCity] = useState<CityResult>(DEFAULT_CITY)
  const [info, setInfo] = useState<{
    tempMax: number
    tempMin: number
    current: number
    feelsLike: number
    advice: string
    tips: string[]
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadWeather = useCallback(async (targetCity: CityResult) => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchWeather(targetCity.latitude, targetCity.longitude)
      const dailyCode = data.daily.weather_code[0] || data.current.weather_code
      const clothing = getClothingAdvice(
        data.daily.temperature_2m_max[0],
        data.daily.temperature_2m_min[0],
        dailyCode,
        data.current.wind_speed_10m
      )
      setInfo({
        tempMax: Math.round(data.daily.temperature_2m_max[0]),
        tempMin: Math.round(data.daily.temperature_2m_min[0]),
        current: Math.round(data.current.temperature_2m),
        feelsLike: Math.round(data.current.apparent_temperature),
        advice: clothing.clothing,
        tips: clothing.tips,
      })
    } catch {
      setError('获取天气数据失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadWeather(city)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCitySelect = useCallback((selected: CityResult) => {
    setCity(selected)
    loadWeather(selected)
  }, [loadWeather])

  return (
    <View className='container'>
      <View className='body-layers'>
        <Image className='body-img' src={bodyImg} mode='aspectFill' />
        {info && !loading && getClothingItems(info.feelsLike).map((item) => {
          const pos = ITEM_POS_MAP[item]
          if (!pos) return null
          return (
            <ClothingItem
              key={item}
              name={item}
              {...pos}
            />
          )
        })}
      </View>

      {info && !loading && (
        <>
          <CityPicker currentCity={city.name} onSelect={handleCitySelect} />
          <Text className='current-feel'>{`${info.feelsLike}℃`}</Text>
        </>
      )}

      <View className='content'>

        {loading && <Text className='hint'>加载中...</Text>}

        {error && (
          <View>
            <Text className='hint error'>{error}</Text>
            <Text className='hint retry' onClick={() => loadWeather(city)}>点击重试</Text>
          </View>
        )}

        {info && !loading && (
          <View className='weather-text'>
            {info.tips.map((tip, i) => (
              <Text className='line tip' key={i}>⚠ {tip}</Text>
            ))}
          </View>
        )}
      </View>

      {info && !loading && (
        <View className='bottom-bar'>
          <Text className='temp-range'>{`${info.tempMin}℃~${info.tempMax}℃`}</Text>
          <Text className='date-text'>{`${new Date().getFullYear()}.${String(new Date().getMonth() + 1).padStart(2, '0')}.${String(new Date().getDate()).padStart(2, '0')}`}</Text>
        </View>
      )}
    </View>
  )
}
