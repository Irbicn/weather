import getData from "./getData";

const weather = {
    'Clouds': 'Url'
}
const render = ()=>{
    
    const weather = document.createElement('div');
        weather.className = "weather";
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
            <img height="70" width="70" src="${weather[data.weather[0].main]}" alt="${data.weather[0].description}" class="weather-card-img"/>
            <span>Humedad: ${data.main.humidity}%</span>
            <span>Viento: ${wind} Km/h</span>
            <p class="weather-card-desc">${data.weather[0].description}</p>
            `;
        return container;
    }
    const Render = {
        add(){
            
            const container = card(main.data);
            
            if(weather.children.length >= 2){
                weather.lastChild.remove();
                weather.prepend(container);
                return;
            }
            weather.prepend(container);
        },
    }
    return Public;
}
export default render;