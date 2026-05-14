import type { ClothingAdvice, HourlyWeather, RainPeriod } from '../../types/weather'
import { isRainy, isSnowy } from './weather'
import { CLOTHING_RULES, WEATHER_TIPS, THRESHOLDS } from '../constants'

/** 根据温度获取穿衣建议 */
export function getClothingAdvice(tempMax: number, tempMin: number, weatherCode: number, windSpeed: number): ClothingAdvice {
  const avgTemp = (tempMax + tempMin) / 2
  const tips: string[] = []

  // 从高到低匹配温度区间
  const rule = CLOTHING_RULES.find((r) => avgTemp >= r.minTemp)
  const clothing = rule?.text ?? '适量穿衣'
  const clothingIcon = rule?.icon ?? '👕'
  const items = rule ? [...rule.items] : []

  if (isRainy(weatherCode)) tips.push(WEATHER_TIPS.rain)
  if (isSnowy(weatherCode)) tips.push(WEATHER_TIPS.snow)
  if (windSpeed >= THRESHOLDS.STRONG_WIND) tips.push(WEATHER_TIPS.strongWind)
  if (tempMax >= THRESHOLDS.HIGH_TEMP) tips.push(WEATHER_TIPS.highTemp)
  if (tempMin <= THRESHOLDS.LOW_TEMP) tips.push(WEATHER_TIPS.lowTemp)
  if (tempMax - tempMin >= THRESHOLDS.BIG_TEMP_DIFF) tips.push(WEATHER_TIPS.bigTempDiff)

  return { clothing, clothingIcon, items, tips }
}

/** 从逐小时数据中提取降雨时段 */
export function findRainPeriods(hourly: HourlyWeather): RainPeriod[] {
  const periods: RainPeriod[] = []
  let inRain = false
  let startIdx = 0
  let maxProb = 0

  const len = Math.min(hourly.time.length, 24)

  for (let i = 0; i <= len; i++) {
    const isRaining = i < len && hourly.precipitation_probability[i] >= THRESHOLDS.RAIN_PROBABILITY

    if (isRaining && !inRain) {
      inRain = true
      startIdx = i
      maxProb = hourly.precipitation_probability[i]
    } else if (isRaining && inRain) {
      maxProb = Math.max(maxProb, hourly.precipitation_probability[i])
    } else if (!isRaining && inRain) {
      inRain = false
      periods.push({
        startHour: startIdx,
        endHour: i,
        startLabel: formatHour(hourly.time[startIdx]),
        endLabel: formatHour(hourly.time[i]),
        maxProbability: maxProb,
      })
      maxProb = 0
    }
  }

  return periods
}

function formatHour(isoTime: string): string {
  return isoTime.split('T')[1] || isoTime
}
