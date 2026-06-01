import { useEffect } from 'react'
import { useLaunch, loadFontFace } from '@tarojs/taro'
import xltFont from './fonts/xlt.ttf'
import './app.scss'

function App({ children }) {
  // 限制 html 根节点 font-size 最大 23px
  const clampFontSize = () => {
    const html = document.documentElement
    const fontSize = parseFloat(getComputedStyle(html).fontSize)
    if (fontSize > 25) {
      html.style.fontSize = '25px'
    }
  }

  useLaunch(() => {
    loadFontFace({
      family: 'CustomFont',
      source: `url("${xltFont}")`,
    })
    clampFontSize()
  })

  useEffect(() => {
    const handler = () => clampFontSize()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return children
}

export default App
