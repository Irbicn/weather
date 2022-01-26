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
            <span class="weather-card-temp">${temp}<span>°C</span></span>
            <img height="70" width="70" src="${getImg(data.weather[0].icon)}" alt="${data.weather[0].description}" class="weather-card-img"/>
            <span>Humedad: ${data.main.humidity}%</span>
            <span>Viento: ${wind} Km/h</span>
            <p class="weather-card-desc">${data.weather[0].description}</p>
            `;
        return container;
    }
    const Render = {
        add(){
            Loading.remove();
            if(err){
                err.remove();
                err = null;
            }
            const container = card(main.data);
            const size = document.body.offsetWidth;
            if(size <= 400){
                weather.innerHTML = '';
                weather.appendChild(container);
            }
            if(weather.children.length >= 2){
                weather.lastChild.remove();
                weather.prepend(container);
                return;
            }
            weather.prepend(container);
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