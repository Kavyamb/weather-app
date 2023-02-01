function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            console.log("lat:" + lat + "long:" + long);
            const data = await getweatherData(lat, long);
            renderweatherData(data);
            var map = L.map('map').setView([20.9716, 80.5946], 5);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            let marker = L.marker([lat,long]).addTo(map);
            marker.bindPopup(data.name).openPopup();

            map.on('click',async function(e)
            {
                console.log("Lat:"+e.latlng.lat+"Long:"+e.latlng.lng);
                var dt = await getweatherData(e.latlng.lat,e.latlng.lng);
                renderweatherData(dt);
            })
            
        })
    }
}

async function getweatherData(lat, long) {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ddfaba4398b491fa4ef3e29a5e934c6e`;

    let response = await fetch(api);/*ajex call to api with lat and long as parameters ---- acma script 4   a new fetch() async[parallel to other browsers] in nature, for ajex call*/
    let data = await response.json();/**await makes a async sync so we specify async in the fucntion declaration  -- here code looks like making a sync call*/

    console.log(data);
    return data;

}

function renderweatherData(data)
{
    document.getElementById("city_name").innerHTML = data.name;
    document.getElementById("temp").innerHTML = data.main.temp;
    document.getElementById("pressure").innerHTML = data.main.pressure;
    document.getElementById("humidity").innerHTML = data.main.humidity;
    document.getElementById("temp_max").innerHTML = data.main.temp_max;
    document.getElementById("temp_min").innerHTML = data.main.temp_min;
}

getLocation();
