
import {Link,Outlet} from 'react-router-dom'
import {MyRouteType} from './types/router'
interface  props  {
  router:MyRouteType[]
}

function App(props:props) {
  return (
    <div className="App">
      <ul>{props.router.map(item=><li key={item.key}><Link to={item.path}>{item.path}</Link></li>)}</ul>
      <Outlet/>
    </div>
  )
}

export default App
