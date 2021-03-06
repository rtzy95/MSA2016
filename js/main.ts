var pageheader = $('#page-header')[0];
var fortemp = $('#for-temp')[0];
var clicky = $("#clicky")[0];

clicky.addEventListener("click", function () {
    changeUI();
});

function changeUI() : void {
    pageheader.innerHTML = "Loading weather from openweathermap.org...";
    getWeather();
}

function getWeather() : void {
    var city = (<HTMLInputElement>document.getElementById("city")).value;
    var img : HTMLImageElement = <HTMLImageElement>  $("#selected-img")[0];
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=14f7fe6958461d28b690d3cda8948696&units=metric',
        type: "POST",
        success: function (data) {
            if (data.cod == 404) {
                pageheader.innerHTML = data.message + " - " + city;
            } else {
                pageheader.innerHTML = "Current weather at " + city + ", " + data.sys.country + " is:<br>" + data.weather[0].main;
                img.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                fortemp.innerHTML = "Temperature is about " + data.main.temp + "&#8451";
                getWeatherWallpaper(data.weather[0].main);
            }
        },
        error: function () {
            alert("error");
        }
    })
}

function getWeatherWallpaper(weather) {
    $.ajax({
        url: 'https://pixabay.com/api/?key=3306965-05771dad55b346637163a7cbe&q=' + weather + '&per_page=200',
        type: 'GET',
        success: function (data) {
            if (data.totalHits > 0) {
                var random_URL = data.hits[Math.floor(Math.random() * data.hits.length)].webformatURL;
                $("html").css("background-image", "url(" + encodeURI(random_URL) + ")");
            }
            else {
                console.log('No hits');
            }
        },
        error: function () {
            alert("Error");
        }
    })
}