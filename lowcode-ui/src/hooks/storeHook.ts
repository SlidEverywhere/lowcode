// store状态管理hook
 
import { useContext } from 'react'
import StoreContext from '../contexts/storeContext'
import { observer } from 'mobx-react-lite'

function useStore () {
  const store = useContext(StoreContext)
  return store
}

export {
  observer, // 用于监听store数据的改变，同步到组件数据中
  useStore, // 用于获取store数据
}
