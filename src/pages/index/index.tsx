import { useState, useEffect, useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import CityPicker from '../../components/city-picker'
import WeatherCard from '../../components/weather-card'
import RainTimeline from '../../components/rain-timeline'
import ClothingAdvice from '../../components/clothing-advice'
import { fetchWeather } from '../../services/weather'
import { getWeatherInfo } from '../../utils/weather'
import { getClothingAdvice, findRainPeriods } from '../../utils/clothing'
import type { CityResult, WeatherDisplayData } from '../../../types/weather'
import './index.scss'

// 默认城市：上海
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
  const [weather, setWeather] = useState<WeatherDisplayData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadWeather = useCallback(async (targetCity: CityResult) => {
    setLoading(true)
    setError('')
    try {
      const data = await fetchWeather(targetCity.latitude, targetCity.longitude)
      const weatherInfo = getWeatherInfo(data.current.weather_code)
      const dailyCode = data.daily.weather_code[0] || data.current.weather_code
      const rainPeriods = findRainPeriods(data.hourly)
      const clothing = getClothingAdvice(
        data.daily.temperature_2m_max[0],
        data.daily.temperature_2m_min[0],
        dailyCode,
        data.current.wind_speed_10m
      )

      setWeather({
        cityName: targetCity.name,
        currentTemp: data.current.temperature_2m,
        feelsLike: data.current.apparent_temperature,
        weatherText: weatherInfo.text,
        weatherIcon: weatherInfo.icon,
        tempMax: data.daily.temperature_2m_max[0],
        tempMin: data.daily.temperature_2m_min[0],
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        rainPeriods,
        clothing,
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
      <CityPicker currentCity={city.name} onSelect={handleCitySelect} />

      {loading && (
        <View className='loading'>
          <Text className='loading__text'>加载天气数据中...</Text>
        </View>
      )}

      {error && (
        <View className='error'>
          <Text className='error__text'>{error}</Text>
          <Text className='error__retry' onClick={() => loadWeather(city)}>点击重试</Text>
        </View>
      )}

      {weather && !loading && (
        <>
          <WeatherCard data={weather} />
          <RainTimeline periods={weather.rainPeriods} />
          <ClothingAdvice advice={weather.clothing} hasRain={weather.rainPeriods.length > 0} />
        </>
      )}
    </View>
  )
}
