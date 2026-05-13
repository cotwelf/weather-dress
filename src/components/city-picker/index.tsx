import { useState, useCallback } from 'react'
import { View, Input, Text, ScrollView } from '@tarojs/components'
import { searchCity } from '../../services/weather'
import type { CityResult } from '../../../types/weather'
import './index.scss'

interface Props {
  currentCity: string
  onSelect: (city: CityResult) => void
}

export default function CityPicker({ currentCity, onSelect }: Props) {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<CityResult[]>([])
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSearch = useCallback(async (value: string) => {
    setKeyword(value)
    if (value.trim().length === 0) {
      setResults([])
      return
    }
    setLoading(true)
    try {
      const cities = await searchCity(value.trim())
      setResults(cities)
    } catch {
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSelect = useCallback((city: CityResult) => {
    onSelect(city)
    setKeyword('')
    setResults([])
    setExpanded(false)
  }, [onSelect])

  return (
    <View className='city-picker'>
      <View className='city-picker__header' onClick={() => setExpanded(!expanded)}>
        <Text className='city-picker__icon'>📍</Text>
        <Text className='city-picker__city'>{currentCity}</Text>
        <Text className='city-picker__arrow'>{expanded ? '▲' : '▼'}</Text>
      </View>
      {expanded && (
        <View className='city-picker__panel'>
          <Input
            className='city-picker__input'
            placeholder='输入城市名称搜索...'
            value={keyword}
            onInput={(e) => handleSearch(e.detail.value)}
          />
          {loading && <Text className='city-picker__hint'>搜索中...</Text>}
          {!loading && results.length === 0 && keyword.length > 0 && (
            <Text className='city-picker__hint'>未找到相关城市</Text>
          )}
          {results.length > 0 && (
            <ScrollView className='city-picker__list' scrollY>
              {results.map((city) => (
                <View
                  key={city.id}
                  className='city-picker__item'
                  onClick={() => handleSelect(city)}
                >
                  <Text className='city-picker__name'>{city.name}</Text>
                  <Text className='city-picker__region'>
                    {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  )
}
