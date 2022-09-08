let weather = (() => {
    let infoPlacement = (response) => {
        // name of the city 
        let searchName = document.getElementById("search-name");
        searchName.innerText = `${response[0].name} ${response[0].sys.country}`;
        // date for the time zone of the city 
        function addZero(i) {
                if (i < 10) {i = "0" + i}
                return i;
            }
        const weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let todayMillisec =  new Date().getTime();
        let offset = new Date().getTimezoneOffset();
        let offsetMilliSec = 60 * 1000 * offset;
        let timeZone = response[0].timezone * 1000;
        let todayUTCmillisec = todayMillisec + offsetMilliSec + timeZone;    
        let today = new Date(todayUTCmillisec);
        let dayNow = weekDay[today.getDay()];
        let searchDay = document.getElementById("search-day");
        searchDay.innerText = dayNow;
        let date = today.getFullYear()+'-'+addZero((today.getMonth()+1))+'-'+addZero(today.getDate());
        let time = addZero(today.getHours()) + ":" + addZero(today.getMinutes());
        let dateTime = date+ " | " +time;
        let searchTime = document.getElementById("search-time");
        searchTime.innerHTML = dateTime;
        // img for the current weather
        let searchImg = document.getElementById("search-img-icon");
        let weatherIcon = response[0].weather[0].icon;
        if (weatherIcon === "50d" || weatherIcon === "50n") {
            searchImg.src = `imgs/weather-icons/${weatherIcon}.svg`
            searchImg.style.filter = "invert(99%) sepia(9%) saturate(329%) hue-rotate(258deg) brightness(118%) contrast(100%)";
            // searchImg.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
        } else {
            searchImg.style.filter = "";
            searchImg.src = `imgs/weather-icons/${weatherIcon}.svg`;
        };
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
        // sunrise
        let infoSunrise = document.getElementById("info-temp-ul-sunrise");
        let infoSunriseDate = new Date((response[0].sys.sunrise * 1000) + timeZone + offsetMilliSec);
        let infoSunriseTime = `${addZero(infoSunriseDate.getHours())}:${addZero(infoSunriseDate.getMinutes())}`;
        infoSunrise.innerText = `Sunrise \n ${infoSunriseTime}`;
        // additional info
        let infoCloud = document.getElementById("info-add-ul-clouds");
        infoCloud.innerText = `Cloudiness \n ${response[0].clouds.all}%`;
        let infoVisibility = document.getElementById("info-add-ul-visibility");
        infoVisibility.innerText = `Visibility \n ${(response[0].visibility)/1000}km`;
        let infoHumidity = document.getElementById("info-add-ul-humidity");
        infoHumidity.innerText = `Humidity \n ${response[0].main.humidity}%`;
        let infoWind = document.getElementById("info-add-ul-wind");
        infoWind.innerText = `Wind \n ${(response[0].wind.speed).toFixed(1)}m/s`;
        // sunset
        let infoSunset = document.getElementById("info-add-ul-sunset");
        let infoSunsetDate = new Date((response[0].sys.sunset * 1000) + timeZone + offsetMilliSec);
        let infoSunsetTime = `${addZero(infoSunsetDate.getHours())}:${addZero(infoSunsetDate.getMinutes())}`;
        infoSunset.innerText =`Sunset \n ${infoSunsetTime}`;

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
            console.log(response);
        } catch (err) {
            console.log(err);
        }   
    }
    let location = (() => {
        let searchInput = document.getElementById("search-input");    
        let city = () => {
        result = searchInput.value;
        information(result);      
        searchInput.value =""
        }
        let search = document.getElementById("search-img");
        search.addEventListener("click", city);
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                city()
            }
        })
    })();    






})();
