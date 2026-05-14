import { useLaunch, loadFontFace } from '@tarojs/taro'
import xltFont from './fonts/xlt.ttf'
import './app.scss'

function App({ children }) {
  useLaunch(() => {
    loadFontFace({
      family: 'CustomFont',
      source: `url("${xltFont}")`,
    })
  })

  return children
}

export default App
