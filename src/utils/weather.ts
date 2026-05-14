import { WEATHER_CODE_MAP } from '../constants'

/** WMO 天气代码转中文描述和图标 */
export function getWeatherInfo(code: number): { text: string; icon: string } {
  return WEATHER_CODE_MAP[code] || { text: '未知', icon: '🌡' }
}

/** 判断天气代码是否为雨天 */
export function isRainy(code: number): boolean {
  return (code >= 51 && code <= 67) || (code >= 80 && code <= 82)
}

/** 判断天气代码是否为雪天 */
export function isSnowy(code: number): boolean {
  return (code >= 71 && code <= 77) || (code >= 85 && code <= 86)
}
