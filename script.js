let weather = (() => {   
    let infoPlacement = (response) => {
        // name of the city 
        let searchName = document.getElementById("search-name");
        searchName.innerText = `${response[0].name} ${response[0].sys.country}`;
        // date for the time zone of the city 
        let timeZoneTime = (timesec) => {
            function addZero(i) {
                if (i < 10) {i = "0" + i}
                return i;
            };         
            const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];            
            let todayMillisec = (() => {
                if(timesec) {
                    return new Date(timesec*1000).getTime();
                } else {
                    return new Date().getTime();
                }
            })(); 
            let offset = new Date().getTimezoneOffset();
            let offsetMilliSec = 60 * 1000 * offset;
            let timeZone = response[0].timezone * 1000;
            let todayUTCmillisec = todayMillisec + offsetMilliSec + timeZone;    
            let today = new Date(todayUTCmillisec);
            let dayNow = weekDay[today.getDay()];                 
            let date = today.getFullYear()+'-'+addZero((today.getMonth()+1))+'-'+addZero(today.getDate());
            let time = addZero(today.getHours()) + ":" + addZero(today.getMinutes());
            let dateTime = date+ " | " +time;
            let result = {
                weekday: dayNow,
                date: dateTime,
                hour: time
            }
            return result
        };
        let dayTimeInfo = timeZoneTime();
        let searchDay = document.getElementById("search-day");
        searchDay.innerText = dayTimeInfo.weekday;
        let dateTime = dayTimeInfo.date;
        let searchTime = document.getElementById("search-time");
        searchTime.innerHTML = dateTime;
        // img for the current weather
        let searchIcon = (icon, id) => {
            if (icon === "50d" || icon === "50n") {         
                id.style.filter = "invert(99%) sepia(9%) saturate(329%) hue-rotate(258deg) brightness(118%) contrast(100%)";
                id.src = `imgs/weather-icons/${icon}.svg`;
            // searchImg.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
            } else {
                id.style.filter = "";
                id.src = `imgs/weather-icons/${icon}.svg`;
            };  
        }        
        let searchImg = document.getElementById("search-img-icon");
        searchIcon(response[0].weather[0].icon, searchImg);
        // description of weather
        let searchDis = document.getElementById("search-icon-description");
        searchDis.innerText = response[0].weather[0].main;
        // temperature 
        let celsius = true;
        let symbol = (() => {
            if (celsius === true) {
                return "°C";
            } else {
                return "°F"
            }
        })();
        let infoTemp = document.getElementById("info-temp-ul-temp");
        infoTemp.innerText = `Temperature \n ${(response[0].main.temp).toFixed(1)}${symbol}`;
        let infoTempFeel = document.getElementById("info-temp-ul-temp-feel");
        infoTempFeel.innerText = `Feels like \n ${(response[0].main.feels_like).toFixed(1)}${symbol}`;
        let infoTempMax = document.getElementById("info-temp-ul-temp-max");
        infoTempMax.innerText = `Max \n ${(response[0].main.temp_max).toFixed(1)}${symbol}`;
        let infoTempMin = document.getElementById("info-temp-ul-temp-min");
        infoTempMin.innerText = `Min \n ${(response[0].main.temp_min).toFixed(1)}${symbol}`;
        // sunrise and sunset
        let infoSunrise = document.getElementById("info-temp-ul-sunrise");
        let infoSunriseDate = timeZoneTime(response[0].sys.sunrise);
        infoSunrise.innerText = `Sunrise \n ${infoSunriseDate.hour}`;
        let infoSunset = document.getElementById("info-add-ul-sunset");
        let infoSunsetDate = timeZoneTime(response[0].sys.sunset);
        infoSunset.innerText =`Sunset \n ${infoSunsetDate.hour}`;
        // additional info
        let infoCloud = document.getElementById("info-add-ul-clouds");
        infoCloud.innerText = `Cloudiness \n ${response[0].clouds.all}%`;
        let infoVisibility = document.getElementById("info-add-ul-visibility");
        infoVisibility.innerText = `Visibility \n ${(response[0].visibility)/1000}km`;
        let infoHumidity = document.getElementById("info-add-ul-humidity");
        infoHumidity.innerText = `Humidity \n ${response[0].main.humidity}%`;
        let infoWind = document.getElementById("info-add-ul-wind");
        infoWind.innerText = `Wind \n ${(response[0].wind.speed).toFixed(1)}m/s`;
        // 7 days forecast cards
        let cards = document.querySelectorAll(".week-weather");  
        let counter = 1;
        let counterAd = (() => {
            if (counter === cards.length) {
                counter = 1;
            }
        })();

        let weatherCard = () => {
            let info1 = document.createElement("div");
            let info2 = document.createElement("div");
            let info21 = document.createElement("img");
            let info22 = document.createElement("div");
            let info3 = document.createElement("div");
            let info31 = document.createElement("div");
            let info32 = document.createElement("div");
            let box = document.getElementById(`${counter}day`);
            box.appendChild(info1);
            box.appendChild(info2);
            info2.appendChild(info21);
            info2.appendChild(info22);
            info2.style.display = "grid";
            info2.style.justifyItems = "center"
            // info21.style.width = "80px"
            box.appendChild(info3);
            info3.appendChild(info31);
            info3.appendChild(info32);
            info3.style.display = "flex";
            info3.style.width = "150px";
            info3.style.justifyContent = "space-around";
            info1.innerText = timeZoneTime(response[1].daily[counter].dt).weekday;
            searchIcon(response[1].daily[counter].weather[0].icon, info21)
            info22.innerText = response[1].daily[counter].weather[0].main;
            info31.innerText = `${(response[1].daily[counter].temp.max).toFixed(1)}${symbol}`;
            info32.innerText = `${(response[1].daily[counter].temp.min).toFixed(1)}${symbol}`;
            counter += 1;
        }                 
        cards.forEach(card => {
            weatherCard();            
        });
    }
    let information = async(city) => {       
        try {  
            const response = [];
            let url1 = response.push(await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=537db72077c768b0b2315f4c71276145&units=metric`,
                {mode: 'cors'}).then(res => res.json()));
            let latitude = response[0].coord.lat;
            let longitude = response[0].coord.lon;
            let url2 = response.push(await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&units=metric&appid=20f7632ffc2c022654e4093c6947b4f4`,
                {mode: 'cors'}).then(res => res.json()));                 
            // const response = await Promise.all(
            //     urls.map(url => fetch(url, {mode: 'cors'}).then(res => res.json()))
            // );        
            infoPlacement(response)
        } catch (err) {
            console.log(err);
        }   
    }
    let location = (() => {
        let searchInput = document.getElementById("search-input");    
        let city = () => {
            let empty = document.querySelectorAll(".week-weather");
            empty.forEach(e => {
                e.innerHTML="";
            });
            result = searchInput.value;
            information(result);      
            searchInput.value ="";
        }
        let search = document.getElementById("search-img");
        search.addEventListener("click", city);
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                city();
            }
        })
    })(); 
    window.addEventListener('load', (event) => {
        information("istanbul");
    });    
})();
