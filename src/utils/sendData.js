import getData from "./getData";
import render from "./render";
import showError from "./showError";
const sendData = ()=>
{
    let Render;
    let main;
    let cantFind;
    const Public = {
        run(core){
            main = core;
            logic();
        }
    }
    const logic = ()=>{
        cantFind = showError('no se encontro la busqueda', main.app);
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
        cantFind.remove();
        const data = await getData({cityName: main.country, key: main.key});
        if(!(data.name)){
            cantFind.add();
            return;
        }
        main.data = data;
        main.render.add();
    }
    return Public;
}
export default sendData;