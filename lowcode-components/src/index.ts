// import {MyComponent} from '@/types/router'
// const components = import.meta.glob('./components/**/*.tsx')
// const componentsPromise = Object.keys(components) 
// .map(item=>components[item])
// .map(f=>f())
// const Components:MyComponent ={}
// Promise.all(componentsPromise)
// .then(list=>{
//   for(let module of list){
//     const md = module as any
//   for(let key in md){
//     const Component = md[key]
//     console.log(Component);
    
//     Components[Component.name] = Component
//   }
    
//   }
//   console.log(Components);
  
// })
// export default Components
export * from './components/management/HelloWorld'
export * from './components/management/index'
export * from './components/test/index'

