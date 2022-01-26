(()=>{"use strict";const e=async({id:e=null,cityName:t=null,stateCode:a=null,position:n={lat:null,lon:null}||null,key:r=console.error("debe tener una Apikey")})=>{let o="https://api.openweathermap.org/data/2.5/weather?";e&&(o+=`id=${e}`),t&&(o+=`q=${t}`),a&&(o+=`,${a}`),n.lat&&n.lon&&(o=`https://api.openweathermap.org/data/2.5/weather?lat=${n.lat}&lon=${n.lon}`),o+=`&appid=${r}&lang=es`;const d=await fetch(o);return await d.json()};(async({appNode:t,plugins:a=[],key:n})=>{const r=t;r.className="app";const o=n;let d,i,s;const c={get app(){return r},set data(e){d=e},get data(){return d},set country(e){i=e},get country(){return i},get key(){return o},set render(e){s=e},get render(){return s}};a.map((e=>e.run(c))),"geolocation"in navigator&&navigator.geolocation.getCurrentPosition((async function(t){s.loading(!0),d=await e({position:{lat:t.coords.latitude,lon:t.coords.longitude},key:n}),s.add()}),(e=>{s.error(e.code)}))})({key:"a588056cf21a310b19bb34b37d017a9b",appNode:document.getElementById("app"),plugins:[(()=>{let e;const t={run(t){e=t,n()}},a=t=>{e.country=t.target.value},n=()=>{const t=document.createElement("form");t.className="form";const n=document.createElement("input");n.autofocus=!0,n.placeholder="Pais o Ciudad",n.className="input",n.oninput=a,t.appendChild(n),e.app.appendChild(t)};return t})(),(()=>{let t;const a={run(e){t=e,n()}},n=()=>{const e=document.createElement("button");e.className="input-send",e.textContent="search",e.onclick=r,t.app.firstChild&&t.app.firstChild.appendChild(e)},r=async a=>{a.preventDefault(),t.render.notFound(!1),t.render.loading(!0);const n=await e({cityName:t.country,key:t.key});if(!n.name)return t.render.loading(!1),void t.render.notFound(!0);t.data=n,t.render.add()};return a})(),(()=>{const e=document.createElement("div");e.className="weather";const t=document.createElement("p");t.className="loading",t.textContent="Loading...";const a=document.createElement("div");let n,r;a.className="error-notFound",a.textContent="no se encontro la busqueda";const o={run(t){r=t,r.render=i,r.app.appendChild(e)}},d=e=>{const t=Math.round(3.6*e.wind.speed),a=Math.round(e.main.temp-273.15),n=document.createElement("div");return n.className="weather-card",n.innerHTML=`\n            <h3 class="weather-card-name">${e.name}</h3>\n            <span class="weather-card-country">${e.sys.country}</span>\n            <span class="weather-card-temp">${a}<span>°C</span></span>\n            <img \n                height="70" \n                width="70" \n                src="${r=e.weather[0].icon,`https://openweathermap.org/img/wn//${r}.png`}" \n                alt="${e.weather[0].description}" \n                class="weather-card-img"\n            />\n            <span>Humedad: ${e.main.humidity}%</span>\n            <span>Viento: ${t} Km/h</span>\n            <p class="weather-card-desc">${e.weather[0].description}</p>\n            `,n;var r},i={add(){n&&(n.remove(),n=null);let a=!1;if(Array.prototype.map.call(e.children,(n=>{n.children[0].textContent===r.data.name&&((a=>{const n=d(r.data);n.classList.add("weather-card-updated"),e.replaceChild(n,a);const o=document.createElement("p");o.textContent="Actualizado!",o.className="loading",r.app.appendChild(o),t.remove(),setTimeout((()=>{o.remove(),n.classList.remove("weather-card-updated")}),500)})(n),a=!0)})),a)return r.app.firstChild.firstChild.value="",void r.app.firstChild.firstChild.focus();const o=d(r.data),i=document.body.offsetWidth;return t.remove(),i<=420?(e.innerHTML="",e.appendChild(o),void(r.app.firstChild.firstChild.value="")):e.children.length>=2?(e.lastChild.remove(),e.prepend(o),r.app.firstChild.firstChild.value="",void r.app.firstChild.firstChild.focus()):void(e.children[0]?(e.prepend(o),r.app.firstChild.firstChild.value="",r.app.firstChild.firstChild.focus()):e.prepend(o))},loading(e){e?r.app.appendChild(t):t.remove()},notFound(e){if(e)return r.app.appendChild(a),void setTimeout((()=>{a.remove()}),2500);a.remove()},error(t){const a=document.createElement("div");a.className="location-error";const r=document.createElement("p");switch(a.appendChild(r),t.code){case t.PERMISSION_DENIED:r.textContent="Porfavor Permite el acceso a tu ubicacion solo si quieres que se muestre automaticamente el clima donde estas o procede a buscar el clima de algun lugar";break;case t.POSITION_UNAVAILABLE:r.textContent="No hemos encontrado tu ubicacion, no hay nada que hacer al respecto";break;case t.TIMEOUT:r.textContent="Se a tardado demasiado en obtener tu ubicacion, revisa tu conexion a internet o intentalo mas tarde";break;case t.UNKNOWN_ERROR:r.textContent="Si ves esto no tengo idea de lo que pasa. Procede, si puedes, a buscar el clima de algun lugar"}n=a,e.appendChild(a)}};return o})()]})})();