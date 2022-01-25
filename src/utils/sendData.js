import getData from "./getData";
const sendData = ()=>
{
    let main;
    let cantFind;
    const Public = {
        run(core){
            main = core;
            logic();
        }
    }
    const logic = ()=>{
        const send = document.createElement("button");
            send.className = "input-send";
            send.textContent = "search";
        send.onclick = action;
        if(main.app.firstChild){
            main.app.firstChild.appendChild(send);
        }
    }
    const action = async (event)=>{
        event.preventDefault();
        main.render.notFound(false);
        main.render.loading(true);
        const data = await getData({cityName: main.country, key: main.key});
        if(!(data.name)){
            main.render.loading(false);
            main.render.notFound(true);
            return;
        }
        main.data = data;
        main.render.add();
    }
    return Public;
}
export default sendData;