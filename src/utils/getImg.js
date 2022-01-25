const Url = "https://openweathermap.org/img/wn/";
const getImg = (code)=>{
    const url = `${Url}/${code}.png`;
    return url;
}
export default getImg;