import { useLaunch } from '@tarojs/taro'
import './app.scss'

function App({ children }) {
  useLaunch(() => {})

  return children
}

export default App
