/** 城市搜索结果 */
export interface CityResult {
  id: number
  name: string
  latitude: number
  longitude: number
  country: string
  admin1?: string
  admin2?: string
  timezone: string
}

/** Open-Meteo 城市搜索响应 */
export interface GeoCodingResponse {
  results?: CityResult[]
}

/** 当前天气 */
export interface CurrentWeather {
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  weather_code: number
  wind_speed_10m: number
}

/** 逐小时天气 */
export interface HourlyWeather {
  time: string[]
  temperature_2m: number[]
  precipitation_probability: number[]
  precipitation: number[]
  weather_code: number[]
  wind_speed_10m: number[]
}

/** 每日天气 */
export interface DailyWeather {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  sunrise: string[]
  sunset: string[]
  precipitation_sum: number[]
  weather_code: number[]
}

/** Open-Meteo 天气预报响应 */
export interface WeatherResponse {
  latitude: number
  longitude: number
  timezone: string
  current: CurrentWeather
  hourly: HourlyWeather
  daily: DailyWeather
}

/** 降雨时段 */
export interface RainPeriod {
  startHour: number
  endHour: number
  startLabel: string
  endLabel: string
  maxProbability: number
}

/** 穿衣建议 */
export interface ClothingAdvice {
  clothing: string
  clothingIcon: string
  items: string[]
  tips: string[]
}

/** 整合后的天气数据（用于 UI 展示） */
export interface WeatherDisplayData {
  cityName: string
  currentTemp: number
  feelsLike: number
  weatherText: string
  weatherIcon: string
  tempMax: number
  tempMin: number
  humidity: number
  windSpeed: number
  rainPeriods: RainPeriod[]
  clothing: ClothingAdvice
}
