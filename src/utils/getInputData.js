

const getInputData = ()=>{
    let main;
    const Public = {
        run(core){
            main = core;
            logic();
        }
    }
    const updateCountry = (event)=>
    {
        main.country = event.target.value;
    }
    const logic =()=>
    {
        const container = document.createElement('form');
            container.className = 'form'
        const input = document.createElement('input');
            input.autofocus = true;
            input.placeholder = "Pais o Ciudad";
            input.className = "input";
            input.oninput = updateCountry;
        container.appendChild(input);
        main.app.appendChild(container);
    }
    return Public;
}
export default getInputData;