import Taro from '@tarojs/taro'
import type { GeoCodingResponse, WeatherResponse, CityResult } from '../../types/weather'

const GEO_API = 'https://geocoding-api.open-meteo.com/v1/search'
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast'

/** 搜索城市 */
export async function searchCity(keyword: string): Promise<CityResult[]> {
  const res = await Taro.request({
    url: GEO_API,
    method: 'GET',
    data: { name: keyword, count: 10, language: 'zh' },
  })
  const data = res.data as GeoCodingResponse
  return data.results || []
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
