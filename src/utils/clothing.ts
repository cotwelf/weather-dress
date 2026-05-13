import type { ClothingAdvice, HourlyWeather, RainPeriod } from '../../types/weather'
import { isRainy, isSnowy } from './weather'

/** 根据温度获取穿衣建议 */
export function getClothingAdvice(tempMax: number, tempMin: number, weatherCode: number, windSpeed: number): ClothingAdvice {
  const avgTemp = (tempMax + tempMin) / 2
  let clothing: string
  let clothingIcon: string
  const tips: string[] = []

  if (avgTemp >= 30) {
    clothing = '短袖短裤，清凉透气'
    clothingIcon = '👕'
  } else if (avgTemp >= 25) {
    clothing = 'T恤/薄衬衫，舒适为主'
    clothingIcon = '👕'
  } else if (avgTemp >= 20) {
    clothing = '薄长袖/卫衣，早晚可备薄外套'
    clothingIcon = '🧥'
  } else if (avgTemp >= 15) {
    clothing = '外套/卫衣，注意保暖'
    clothingIcon = '🧥'
  } else if (avgTemp >= 10) {
    clothing = '厚外套/毛衣，注意保暖'
    clothingIcon = '🧶'
  } else if (avgTemp >= 0) {
    clothing = '棉衣/羽绒服，做好防寒'
    clothingIcon = '🧥'
  } else {
    clothing = '厚羽绒服/棉服，全副武装'
    clothingIcon = '🧤'
  }

  // 雨天提醒
  if (isRainy(weatherCode)) {
    tips.push('记得带伞')
  }

  // 雪天提醒
  if (isSnowy(weatherCode)) {
    tips.push('注意路面湿滑')
  }

  // 大风提醒
  if (windSpeed >= 30) {
    tips.push('风大注意防风')
  }

  // 高温提醒
  if (tempMax >= 35) {
    tips.push('注意防晒防暑')
  }

  // 低温提醒
  if (tempMin <= 0) {
    tips.push('注意防冻')
  }

  // 温差大提醒
  if (tempMax - tempMin >= 10) {
    tips.push('昼夜温差大，注意增减衣物')
  }

  return { clothing, clothingIcon, tips }
}

/** 从逐小时数据中提取降雨时段 */
export function findRainPeriods(hourly: HourlyWeather): RainPeriod[] {
  const periods: RainPeriod[] = []
  let inRain = false
  let startIdx = 0
  let maxProb = 0

  // 只看当天的小时数据（最多24小时）
  const len = Math.min(hourly.time.length, 24)

  for (let i = 0; i <= len; i++) {
    const isRaining = i < len && hourly.precipitation_probability[i] >= 40

    if (isRaining && !inRain) {
      // 开始下雨
      inRain = true
      startIdx = i
      maxProb = hourly.precipitation_probability[i]
    } else if (isRaining && inRain) {
      // 继续下雨
      maxProb = Math.max(maxProb, hourly.precipitation_probability[i])
    } else if (!isRaining && inRain) {
      // 雨停了
      inRain = false
      const startTime = hourly.time[startIdx]
      const endTime = hourly.time[i]
      periods.push({
        startHour: startIdx,
        endHour: i,
        startLabel: formatHour(startTime),
        endLabel: formatHour(endTime),
        maxProbability: maxProb,
      })
      maxProb = 0
    }
  }

  return periods
}

/** 格式化时间 "2026-05-13T18:00" → "18:00" */
function formatHour(isoTime: string): string {
  const parts = isoTime.split('T')
  return parts[1] || isoTime
}
