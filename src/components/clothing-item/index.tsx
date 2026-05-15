import { View, Text, Image } from '@tarojs/components'
import { CLOTHING_RULES } from '../../constants'
import lineImg from '../../../assets/images/line.png'
import skirtImg from '../../../assets/images/skirt.png'
import tshirtImg from '../../../assets/images/tshirt.png'
import jacketImg from '../../../assets/images/jacket.png'
import pantsImg from '../../../assets/images/pants.png'
import vestImg from '../../../assets/images/vest.png'
import lightJacketImg from '../../../assets/images/light-jacket.png'
import shortPantsImg from '../../../assets/images/short-pants.png'
import hoodieImg from '../../../assets/images/hoodie.png'
import './index.scss'

export enum TagPos {
  Left = 'left',
  Right = 'right',
}

// 衣物名称 -> 图片映射
const IMAGE_MAP: Record<string, string> = {
  '短裙': skirtImg,
  '短裤': shortPantsImg,
  '短袖': tshirtImg,
  '吊带': vestImg,
  '短T恤': tshirtImg,
  'T恤': tshirtImg,
  '卫衣': hoodieImg,
  '薄外套': lightJacketImg,
  '厚外套': jacketImg,
  '外套': jacketImg,
  '羽绒服': jacketImg,
  '长裤': pantsImg,
  '加绒裤': pantsImg,
  '秋裤': pantsImg,
}

export interface ClothingItemProps {
  name: string
  tagPosition?: TagPos
  offsetX?: number
  offsetY?: number
  rotate?: number
  className?: string
}

export default function ClothingItem({
  name,
  tagPosition = TagPos.Left,
  offsetX = 0,
  offsetY = 0,
  rotate = 0,
  className,
}: ClothingItemProps) {
  const src = IMAGE_MAP[name]
  if (!src) return null

  return (
    <View className={`clothing-item ${className || ''}`}>
      <Image className='clothing-img' src={src} mode='aspectFit' />
      <View
        className={`tag-wrapper ${tagPosition}`}
        style={`transform: translate(${offsetX}%, ${offsetY}%) rotate(${rotate}deg)`}
      >
        <Image className='line-img' src={lineImg} mode='aspectFit' />
        <Text className='name-tag'>{name}</Text>
      </View>
    </View>
  )
}

/** 根据体感温度获取衣物列表 */
export function getClothingItems(feelsLike: number): string[] {
  const rule = CLOTHING_RULES.find((r) => feelsLike >= r.minTemp)
  return rule ? [...rule.items] : []
}
