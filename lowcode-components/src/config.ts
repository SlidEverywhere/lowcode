export class useComponent{
    private url:string
    constructor(url:string){
         this.url = url||'./**.tsx'
    }
    public getComponent(){
        const MComponents = import.meta.glob('./*.tsx')
        // console.log(MComponents);
        const MComponentsPromise = Object.keys(MComponents)
        .map(key=>MComponents[key])
        .map(f=>f())
        console.log(MComponentsPromise);
        
    }
}