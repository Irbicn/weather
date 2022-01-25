const getData= async ({
    id=null,
    cityName = null,
    stateCode = null,
    position = {lat:null, lon:null} || null, 
    key = console.error('debe tener una Apikey')})=>
{
    let APIUrl = "https://api.openweathermap.org/data/2.5/weather?"
    if(id){
        APIUrl += `id=${id}`;
    }
    if(cityName){
        APIUrl += `q=${cityName}`
    }
    if(stateCode){
        APIUrl += `,${stateCode}`
    }
    if(position.lat && position.lon){
        APIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lon}`
    }
    APIUrl += `&appid=${key}&lang=es`;
    const response = await fetch(APIUrl);
    const json = await response.json();
    return json;
}
export default getData;