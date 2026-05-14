/** 穿衣建议：按温度区间定义 */
export const CLOTHING_RULES = [
  { minTemp: 30, text: '短袖短裤，清凉透气', icon: '👕', items: ['短T恤', '短裤', '凉鞋'] },
  { minTemp: 25, text: 'T恤/薄衬衫，舒适为主', icon: '👕', items: ['短袖', '短裤', '单鞋'] },
  { minTemp: 20, text: '薄长袖/卫衣，早晚可备薄外套', icon: '🧥', items: ['薄外套', '长裤', '运动鞋'] },
  // { minTemp: 20, text: '薄长袖/卫衣，早晚可备薄外套', icon: '🧥', items: ['卫衣', '薄外套', '长裤', '运动鞋'] },
  { minTemp: 15, text: '外套/卫衣，注意保暖', icon: '🧥', items: ['卫衣', '薄外套', '长裤', '运动鞋'] },
  { minTemp: 10, text: '厚外套/毛衣，注意保暖', icon: '🧶', items: ['厚外套', '秋衣', '长裤', '运动鞋'] },
  { minTemp: 0, text: '棉衣/羽绒服，做好防寒', icon: '🧥', items: ['羽绒服', '秋衣', '秋裤', '加绒裤', '靴子'] },
  { minTemp: -Infinity, text: '厚羽绒服/棉服，全副武装', icon: '🧤', items: ['羽绒服', '秋衣', '秋裤', '加绒裤', '靴子'] },
] as const

/** 天气提示规则 */
export const WEATHER_TIPS = {
  rain: '记得带伞',
  snow: '注意路面湿滑',
  strongWind: '风大注意防风',
  highTemp: '注意防晒防暑',
  lowTemp: '注意防冻',
  bigTempDiff: '昼夜温差大，注意增减衣物',
} as const

/** 阈值常量 */
export const THRESHOLDS = {
  RAIN_PROBABILITY: 40,    // 降水概率 ≥ 40% 视为降雨
  STRONG_WIND: 30,         // 风速 ≥ 30 km/h 视为大风
  HIGH_TEMP: 35,           // 温度 ≥ 35℃ 高温提醒
  LOW_TEMP: 0,             // 温度 ≤ 0℃ 低温提醒
  BIG_TEMP_DIFF: 10,       // 温差 ≥ 10℃ 提醒增减衣物
} as const

/** WMO 天气代码映射 */
export const WEATHER_CODE_MAP: Record<number, { text: string; icon: string }> = {
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
