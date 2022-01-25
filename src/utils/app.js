import getData from "./getData";
const app = async({appNode, plugins = [], key})=>
{
    const AppNode = appNode;
        AppNode.className = "app";
    const Key = key;
    
    let Data;
    let Country;
    let Render;
    const Public ={
        get app(){
            return AppNode;
        },
        set data(newData){
            Data = newData;
        },
        get data(){
            return Data;
        },
        set country(c){
            Country = c;
        },
        get country(){
            return Country;
        },
        get key(){
            return Key;
        },
        set render(r){
            Render = r;
        },
        get render(){
            return Render;
        },
    }
    plugins.map(plugin => plugin.run(Public));
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            Data = await getData({
                position:{lat: position.coords.latitude, lon: position.coords.longitude},
                key
            })
            console.log(Data);
            Render.add();
        });
    }
};
export default app;