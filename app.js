const display = document.querySelector('.display');
const form = document.querySelector('form');
const img = document.querySelector('img');


let coinFlip = true;

async function getData() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=aa27b563e59dcafaa5d69a98b5628bcf&units=metric`, { mode: 'cors' })
        const weatherData = await response.json();
        const newData = info(weatherData)
        displayData(newData)
        image(newData)
        form.reset();
    } catch (error) {
        alert('Wrong Input')
    }
}

function info(weatherData) {
    const myData = {
        temp: Math.round(weatherData.main.temp),
        weather: weatherData.weather[0].main,
        feelsLike: Math.round(weatherData.main.feels_like),
        wind: Math.round(weatherData.wind.speed),
        humidity: weatherData.main.humidity,
        country: weatherData.sys.country
    }
    return myData
}

function displayData(newData) {
    const displayContainer = document.createElement('div')

    const city = document.createElement('div')
    city.innerHTML = search.value;
    displayContainer.appendChild(city)

    const country = document.createElement('div')
    country.innerHTML = newData.country
    displayContainer.appendChild(country)

    const temp = document.createElement('div')
    temp.innerHTML = `Temperature is : ${newData.temp} &#8451;`
    displayContainer.appendChild(temp)

    const feelsLike = document.createElement('div')
    feelsLike.innerHTML = `Feels like: ${newData.feelsLike} &#8451;`
    displayContainer.appendChild(feelsLike)

    const humidity = document.createElement('div')
    humidity.innerHTML = `Humidity: ${newData.humidity}%`
    displayContainer.appendChild(humidity)

    const wind = document.createElement('div')
    wind.innerHTML = `Wind: ${newData.wind} m/h`
    displayContainer.appendChild(wind)

    display.innerHTML = displayContainer.outerHTML;
}

async function image(newData) {
    const gifRespose = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=E1kydpPVQkmNCfiARD4zGshTQh0M4SWw&s=${newData.weather}`, { mode: 'cors' })
    const gifData = await gifRespose.json();
    img.src = gifData.data.images.original.url
}




form.addEventListener('submit', (e) => {
    e.preventDefault();
    getData();

})
