
// const token = "";

const background = document.querySelector('.background');

// Boutton d'affichage 
const searchButton = document.getElementById('show');
// Affichage ville actuel
const city = document.getElementById('ville');
// Affichage température actuel
const temp = document.getElementById('temperature');
// Affichage de la météo
const weather = document.getElementById('weather');
//Affichage de la descriptiion graphique de la météo 
const icon_weather = document.getElementById('main-icon');
// Affichege de la vitesse du vent
const wind = document.getElementById('wind');
// Affichage du taux d'hulidité
const humidite = document.getElementById('humidite');
// Affichage de la probabilité d'apparution de la pluie 
const rain = document.getElementById('rain');
// Affiche toute la partie des données météo par hours
const hours = document.getElementById('row-hours');
// Affiche toute la partie des données météo par jours 
const days = document.getElementById('days');
// Affichage de la dernière mise à jour des données météo 
const up = document.getElementById('update');

///////////** Les données affiché en sortie **///////////////
// Affichage du nom de la ville complète
const city_out = document.getElementById('ville');
// Afficheage de la température actuelle
const temp_out = document.getElementById('temperature');
// Affichage de la météo
const weather_out = document.getElementById('weather');
//Affichage de la descriptiion graphique de la météo 
const icon_weather_out = document.getElementById('main-icon');
// Affichege de la vitesse du vent
const wind_out = document.getElementById('wind');
// Affichage du taux d'hulidité
const uv_out = document.getElementById('uv');
// Affichage de la probabilité d'apparution de la pluie 
const rain_out = document.getElementById('rain');
// Affiche toute la partie des données météo par hours
const hours_out = document.getElementById('row-hours');
// Affiche toute la partie des données météo par jours 
const days_out = document.getElementById('days');
// Affichage de la dernière mise à jour des données météo 
const up_out = document.getElementById('update');

searchButton.addEventListener('click', () => {
    const ville = document.getElementById('search-input').value;
    if (ville === '') {
        city.innerHTML = 'Veuillez entrer une ville';
        return;
    }

    city.innerHTML = 'Loading...';
    fetch(`http://localhost:8000/api?ville=${ville}`)
        .then(response => response.json())
        .then(data => {

            if (data.error) {
                city.innerHTML = `${data.error}`;
                return;
            }

            const codeWeather = data.forecast[0].weather;
            const [moment, condition, description] = searchWeatherDesc(codeWeather, data.forecast[0].datetime);

            g_meteo = `${moment}_${condition}`;
            icon_weather_out.innerHTML = `<img src="/data/img/weather_icon/${g_meteo}.gif" alt="${g_meteo}">`;
            city_out.innerHTML = `${data.city.name}`;
            weather_out.innerHTML = `${description}`;
            up_out.innerHTML = `dernière maj ${data.update.slice(8, 10)}/${data.update.slice(5, 7)}/${data.update.slice(0, 4)}`;
            let temp_moyenne = Math.trunc((data.forecast[0].tmin + data.forecast[0].tmax) / 2);
            temp_out.innerHTML = `${temp_moyenne}°`;
            wind_out.innerHTML = `${data.forecast[0].wind10m}km/h`;
            uv_out.innerHTML = `${data.forecast[0].tmin}°/${data.forecast[0].tmax}°`;
            rain_out.innerHTML = `${data.forecast[0].probarain}%`;
            days_out.innerHTML = '';

            for (var i = 1; i <= 6; i++) {
                const [moment, condition] = searchWeatherDesc(data.forecast[i].weather, data.forecast[i].datetime);
                g_meteo = `${moment}_${condition}`;
                let temp_moyenne = Math.trunc((data.forecast[i].tmin + data.forecast[i].tmax) / 2);
                let date = new Date(data.forecast[i].datetime);
                let weekday = date.toLocaleDateString("fr-FR", { weekday: "long" });
                let day = String(date.getDate()).padStart(2, "0");
                let month = String(date.getMonth() + 1).padStart(2, "0");
                let date_str =
                    `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)} ${day}/${month}`;
                days_out.innerHTML += `
                <div class="col-days">
                    <div class="hours"><h3><strong>${date_str}</strong></h3></div>
                    <div class="temp"><h3>${temp_moyenne}°</h3></div>
                    <div class="weather"><img src="/data/img/weather_icon/${g_meteo}.gif" alt="${g_meteo}"></div>
                </div>`;
            }

            background.classList.add("max-content");
        })
        .catch(error => {
            city.innerHTML = `Erreur rencontré : ${error}`;
        });
});

/**
 * Fonction qui donne la condition météo d'un weathercode.
 * 
 * @param {*} weathercode le code météo donnée.
 * @returns donne le moment, la condition météo et la description météo. 
 */
function searchWeatherDesc(weathercode, datetimeStr) {
    const heure = parseInt(datetimeStr.slice(11, 13));
    const moment = (heure < 6 || heure > 20) ? 'nuit' : 'jour';

    for (let condition in weatherDescriptions[moment]) {
        if (weathercode in weatherDescriptions[moment][condition]) {
            return [moment, condition, weatherDescriptions[moment][condition][weathercode]];
        }
    }
    return ['jour', 'nuages', 'Météo inconnue'];
}
