import Taro from '@tarojs/taro'
import type { GeoCodingResponse, WeatherResponse, CityResult } from '../../types/weather'

const GEO_API = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

/** 搜索城市 */
export async function searchCity(keyword: string): Promise<CityResult[]> {
  const res = await Taro.request({
    url: GEO_API,
    method: 'GET',
    data: { name: keyword, count: 20, language: 'zh' },
  })
  const data = res.data as GeoCodingResponse
  const results = (data.results || []) as any[]

  // 优先 admin2 匹配，其次 admin1 匹配，最后按人口排序
  const admin2Match = results.filter((item) => item.admin2?.includes(keyword))
  if (admin2Match.length > 0) return admin2Match.slice(0, 10)

  const admin1Match = results.filter((item) => item.admin1?.includes(keyword))
  if (admin1Match.length > 0) return admin1Match.slice(0, 10)

  return results
    .sort((a, b) => (b.population || 0) - (a.population || 0))
    .slice(0, 10)
}

/** 获取天气预报（当前 + 逐小时 + 每日） */
export async function fetchWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
  const res = await Taro.request({
    url: WEATHER_API,
    method: 'GET',
    data: {
      latitude,
      longitude,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,weather_code',
      timezone: 'auto',
      forecast_days: 1,
    },
  })
  return res.data as WeatherResponse
}
