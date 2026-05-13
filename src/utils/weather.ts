/** WMO 天气代码转中文描述和图标 */
export function getWeatherInfo(code: number): { text: string; icon: string } {
  const map: Record<number, { text: string; icon: string }> = {
    0: { text: '晴', icon: '☀️' },
    1: { text: '大部晴朗', icon: '🌤' },
    2: { text: '多云', icon: '⛅' },
    3: { text: '阴天', icon: '☁️' },
    45: { text: '雾', icon: '🌫' },
    48: { text: '雾凇', icon: '🌫' },
    51: { text: '小毛毛雨', icon: '🌦' },
    53: { text: '毛毛雨', icon: '🌦' },
    55: { text: '大毛毛雨', icon: '🌧' },
    56: { text: '冻毛毛雨', icon: '🌧' },
    57: { text: '冻雨', icon: '🌧' },
    61: { text: '小雨', icon: '🌧' },
    63: { text: '中雨', icon: '🌧' },
    65: { text: '大雨', icon: '🌧' },
    66: { text: '冻小雨', icon: '🌧' },
    67: { text: '冻大雨', icon: '🌧' },
    71: { text: '小雪', icon: '🌨' },
    73: { text: '中雪', icon: '🌨' },
    75: { text: '大雪', icon: '❄️' },
    77: { text: '雪粒', icon: '🌨' },
    80: { text: '小阵雨', icon: '🌦' },
    81: { text: '阵雨', icon: '🌧' },
    82: { text: '大阵雨', icon: '🌧' },
    85: { text: '小阵雪', icon: '🌨' },
    86: { text: '大阵雪', icon: '❄️' },
    95: { text: '雷暴', icon: '⛈' },
    96: { text: '雷暴伴小冰雹', icon: '⛈' },
    99: { text: '雷暴伴大冰雹', icon: '⛈' },
  }
  return map[code] || { text: '未知', icon: '🌡' }
}

/** 判断天气代码是否为雨天 */
export function isRainy(code: number): boolean {
  return (code >= 51 && code <= 67) || (code >= 80 && code <= 82)
}

/** 判断天气代码是否为雪天 */
export function isSnowy(code: number): boolean {
  return (code >= 71 && code <= 77) || (code >= 85 && code <= 86)
}
