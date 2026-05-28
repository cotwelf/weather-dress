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
  const [visible, setVisible] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<CityResult[]>([])
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
    setVisible(false)
  }, [onSelect])

  const handleClose = useCallback(() => {
    setKeyword('')
    setResults([])
    setVisible(false)
  }, [])

  return (
    <>
      <Text className='city-trigger' onClick={() => setVisible(true)}>{currentCity}</Text>

      {visible && (
        <View className='city-modal'>
          <View className='city-modal-mask' onClick={handleClose} />
          <View className='city-modal-content'>
            <View className='city-modal-header'>
              <Text className='city-modal-close' onClick={handleClose}>✕</Text>
            </View>
            <Input
              className='city-modal-input'
              placeholder='搜索城市...'
              value={keyword}
              focus
              onInput={(e) => handleSearch(e.detail.value)}
            />
            {loading && <Text className='city-modal-hint'>搜索中...</Text>}
            {!loading && results.length === 0 && keyword.length > 0 && (
              <Text className='city-modal-hint'>未找到相关城市</Text>
            )}
            {results.length > 0 && (
              <ScrollView className='city-modal-list' scrollY>
                {results.map((city) => (
                  <View
                    key={city.id}
                    className='city-modal-item'
                    onClick={() => handleSelect(city)}
                  >
                    <Text className='city-modal-item-name'>{city.name}</Text>
                    <Text className='city-modal-item-region'>
                      {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      )}
    </>
  )
}
