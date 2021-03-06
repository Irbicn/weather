import getImg from "./getImg";

const render = ()=>{
    const weather = document.createElement('div');
        weather.className = "weather";
    const Loading = document.createElement('p');
        Loading.className ="loading";
        Loading.textContent = "Loading...";
    const error = document.createElement('div');
        error.className = "error-notFound";
        error.textContent = 'no se encontro la busqueda';
    let err;
    let main;
    const Public = {
        run(app){
            main = app;
            main.render = Render;
            main.app.appendChild(weather);
        },
    }
    const card = (data)=>{
        const wind = Math.round(data.wind.speed * 3.6 );
        const temp = Math.round(data.main.temp - 273.15);
        
        const container = document.createElement('div');
            container.className = "weather-card";
        
        container.innerHTML = `
            <h3 class="weather-card-name">${data.name}</h3>
            <span class="weather-card-country">${data.sys.country}</span>
            <span class="weather-card-temp">${temp}<span>°C</span></span>
            <img 
                height="70" 
                width="70" 
                src="${getImg(data.weather[0].icon)}" 
                alt="${data.weather[0].description}" 
                class="weather-card-img"
            />
            <span>Humedad: ${data.main.humidity}%</span>
            <span>Viento: ${wind} Km/h</span>
            <p class="weather-card-desc">${data.weather[0].description}</p>
            `;
        return container;
    }
    const update = (itm)=>{ 
        const nodeUpdated = card(main.data);
            nodeUpdated.classList.add("weather-card-updated");
        weather.replaceChild(nodeUpdated, itm);
        const updated = document.createElement('p');
            updated.textContent = "Actualizado!";
            updated.className = "loading";
        main.app.appendChild(updated);
        Loading.remove();
        setTimeout(() => {
            updated.remove();
            nodeUpdated.classList.remove("weather-card-updated");
        }, 500);
    }
    const Render = {
        add(){
            if(err){
                err.remove();
                err = null;
            }
            let upd = false;
            Array.prototype.map.call(weather.children, item =>{
                if(item.children[0].textContent === main.data.name){
                    update(item);
                    upd = true;
                }
            })
            if(upd){
                main.app.firstChild.firstChild.value = "";
                main.app.firstChild.firstChild.focus();
                return;
            }
            const container = card(main.data);
            const size = document.body.offsetWidth;
            Loading.remove();
            
            if(size <= 420){
                weather.innerHTML = '';
                weather.appendChild(container);
                main.app.firstChild.firstChild.value = "";
                return;
            }
            if(weather.children.length >= 2){
                weather.lastChild.remove();
                weather.prepend(container);
                main.app.firstChild.firstChild.value = "";
                main.app.firstChild.firstChild.focus();
                return;
            }
            if(!weather.children[0]){
                weather.prepend(container);
                return;
            }
            weather.prepend(container);
            
            main.app.firstChild.firstChild.value = "";
            main.app.firstChild.firstChild.focus();
        },
        loading(opt){
            if(opt){
                main.app.appendChild(Loading);
                return;
            }
            Loading.remove();
        },
        notFound(opt){
            if(opt){
                main.app.appendChild(error);
                setTimeout(() => {
                    error.remove();
                }, 2500);
                return;
            }
            error.remove();
        },
        error(error){
            const content = document.createElement('div');
                content.className = "location-error";
            const text = document.createElement('p');
            content.appendChild(text);
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    text.textContent = "Porfavor Permite el acceso a tu ubicacion solo si quieres que se muestre automaticamente el clima donde estas o procede a buscar el clima de algun lugar";
                    break;
                case error.POSITION_UNAVAILABLE:
                    // La ubicación no está disponible.
                    text.textContent = "No hemos encontrado tu ubicacion, no hay nada que hacer al respecto";
                    break;
                case error.TIMEOUT:
                    // Se ha excedido el tiempo para obtener la ubicación.
                    text.textContent = "Se a tardado demasiado en obtener tu ubicacion, revisa tu conexion a internet o intentalo mas tarde";
                    break;
                case error.UNKNOWN_ERROR:
                    // Un error desconocido.
                    text.textContent = "Si ves esto no tengo idea de lo que pasa. Procede, si puedes, a buscar el clima de algun lugar";
                    break;
            }
            err = content;
            weather.appendChild(content);
        }
    }
    return Public;
}
export default render;